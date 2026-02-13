import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Define a estrutura do Token (o que tem dentro dele)
interface TokenPayload {
  id: string;
}

// Estende a tipagem do Express para aceitar req.user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let token;

  // 1. Verifica se tem o token no cabeçalho (Bearer Token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Pega apenas o código do token (remove a palavra "Bearer")
      token = req.headers.authorization.split(' ')[1];

      // Decodifica o token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as TokenPayload;

      // Busca o dono do token no banco (sem a senha)
      req.user = await User.findById(decoded.id).select('-passwordHash');

      next(); // Libera o acesso para a rota
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
