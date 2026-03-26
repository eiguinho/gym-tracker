import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface TokenPayload {
  id: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as TokenPayload;

      const currentUser = await User.findById(decoded.id).select('-passwordHash');

      if (!currentUser) {
        res.status(401).json({ message: 'Não autorizado, usuário não encontrado' });
        return;
      }
      req.user = currentUser as Express.Request['user'];

      next();
    } catch (error) {
      res.status(401).json({ message: 'Não autorizado, token falhou' });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Não autorizado, sem token' });
    return;
  }
};