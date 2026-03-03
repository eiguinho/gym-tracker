import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import generateToken from '../utils/generateToken';
import { sendVerificationEmail } from '../utils/sendEmail';

const generateVerificationCode = () => Math.floor(100000 + Math.random() * 900000).toString();

export const register = async (req: Request, res: Response): Promise<any> => {
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

      res.status(201).json({
        message: 'Usuário criado! Verifique seu e-mail com o código de segurança.',
        userId: user._id,
        email: user.email,
        avatarIcon: user.avatarIcon
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error });
  }
};

export const verifyEmail = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'E-mail já verificado.' });
    }

    if (user.verificationCode !== code || !user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
      return res.status(400).json({ message: 'Código inválido ou expirado.' });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatarIcon: user.avatarIcon,
      token: generateToken(user._id.toString()),
      message: 'E-mail verificado com sucesso!',
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao verificar e-mail', error });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      if (!user.isVerified) {
        return res.status(403).json({ message: 'Por favor, verifique seu e-mail antes de fazer login.' });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatarIcon: user.avatarIcon,
        token: generateToken(user._id.toString()),
        message: 'Usuário logado com sucesso!',
      });
    } else {
      res.status(401).json({ message: 'E-mail ou senha inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};