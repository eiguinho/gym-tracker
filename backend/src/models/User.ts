import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  isVerified: boolean;
  verificationCode?: string;
  verificationCodeExpires?: Date;
  avatarIcon: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
    verificationCodeExpires: { type: Date },
    avatarIcon: { type: String, default: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);