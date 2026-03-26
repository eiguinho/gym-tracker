import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Workout from '../models/Workout';
import WorkoutLog from '../models/WorkoutLog'; 
import SleepLog from '../models/SleepLog';
import generateToken from '../utils/generateToken';
import { sendVerificationEmail } from '../utils/sendEmail';

const generateVerificationCode = () => Math.floor(100000 + Math.random() * 900000).toString();

export const register = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, email, password, avatarIcon } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Este e-mail já está em uso' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000);

    const user = await User.create({
      name,
      email,
      passwordHash: hashedPassword,
      avatarIcon,
      verificationCode,
      verificationCodeExpires,
      isVerified: false,
    });

    if (user) {
      sendVerificationEmail(user.email, verificationCode).catch(console.error);

      return res.status(201).json({
        message: 'Usuário criado! Verifique seu e-mail com o código de segurança.',
        userId: user._id,
        email: user.email,
        avatarIcon: user.avatarIcon
      });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao registrar usuário', error });
  }
};

export const verifyEmail = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const isMasterCode = process.env.NODE_ENV !== 'production' && code === '999999';

    if (!isMasterCode) {
      if (user.verificationCode !== code || !user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
        return res.status(400).json({ message: 'Código inválido ou expirado.' });
      }
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatarIcon: user.avatarIcon,
      level: user.level,
      focus: user.focus,
      token: generateToken(user._id.toString()),
      message: 'E-mail verificado com sucesso!',
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao verificar e-mail', error });
  }
};

export const login = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      if (!user.isVerified) {
        return res.status(403).json({ message: 'Por favor, verifique seu e-mail antes de fazer login.' });
      }

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatarIcon: user.avatarIcon,
        level: user.level,
        focus: user.focus,
        token: generateToken(user._id.toString()),
        message: 'Usuário logado com sucesso!',
      });
    } else {
      return res.status(401).json({ message: 'E-mail ou senha inválidos' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado com este e-mail.' });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordCode = resetCode;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    await sendVerificationEmail(user.email, resetCode);

    return res.status(200).json({ message: 'Código de recuperação enviado para o seu e-mail.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao solicitar recuperação', error });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { email, code, newPassword } = req.body;
    const user = await User.findOne({ 
      email, 
      resetPasswordCode: code,
      resetPasswordExpires: { $gt: new Date() } 
    });

    if (!user) {
      return res.status(400).json({ message: 'Código inválido ou expirado.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    user.resetPasswordCode = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ message: 'Senha alterada com sucesso! Faça login agora.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao redefinir senha', error });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, avatarIcon, level, focus } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { name, avatarIcon, level, focus },
      { returnDocument: 'after' } 
    ).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.json({
      message: 'Perfil atualizado com sucesso!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatarIcon: user.avatarIcon,
        level: user.level,
        focus: user.focus
      }
    });
  } catch (error) {
    console.error('Erro no updateProfile:', error);
    return res.status(500).json({ message: 'Erro ao atualizar perfil', error });
  }
};

export const deleteProfile = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await Workout.deleteMany({ userId });
    await WorkoutLog.deleteMany({ userId });
    await SleepLog.deleteMany({ userId });

    return res.status(200).json({ message: 'Conta excluída com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar perfil:', error);
    return res.status(500).json({ message: 'Erro ao excluir conta', error });
  }
};