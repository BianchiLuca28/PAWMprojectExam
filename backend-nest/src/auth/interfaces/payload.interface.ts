import mongoose from 'mongoose';

export interface JwtPayload {
  // userId: mongoose.Types.ObjectId;
  email: string;
  username: string;
}
