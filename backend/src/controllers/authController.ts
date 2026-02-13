import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'Este e-mail já está em uso' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      passwordHash: hashedPassword,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        message: 'Usuário criado com sucesso!',
      })
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error })
  }
}