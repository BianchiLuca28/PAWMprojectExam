import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   default: new mongoose.Types.ObjectId(),
  // })
  // _id: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, default: Date.now() })
  createdOnDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
