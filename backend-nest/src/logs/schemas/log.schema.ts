import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Note } from 'src/notes/schemas/note.schema';
import { User } from 'src/users/schemas/user.schema';

export type LogDocument = Log & Document;

@Schema()
export class Log {
  @Prop({ required: true })
  noteTitle: string;

  @Prop()
  operation: string;

  @Prop()
  message: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: User;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Note' })
  referNote: Note;

  @Prop({ required: true, default: Date.now() })
  createdOnDate: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
