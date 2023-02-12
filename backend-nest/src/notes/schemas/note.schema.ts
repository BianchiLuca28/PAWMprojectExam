import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: User;

  @Prop({ required: true, default: Date.now() })
  createdOnDate: Date;

  @Prop({ required: true, default: Date.now() })
  updatedOnDate: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
