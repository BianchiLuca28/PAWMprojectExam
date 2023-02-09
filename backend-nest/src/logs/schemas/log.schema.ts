import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Note } from 'src/notes/schemas/note.schema';
import { User } from 'src/users/schemas/user.schema';
import logsOperations from 'src/logs/logsOperations';

export type LogDocument = Log & Document;

@Schema()
export class Log {
  @Prop({ required: true })
  noteTitle: string;

  @Prop({
    type: String,
    required: true,
    enum: [
      logsOperations.addNote,
      logsOperations.removeNote,
      logsOperations.updateNote,
    ],
  })
  operation: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: User;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  referNote: Note;

  @Prop({ required: true, default: Date.now(), auto: true })
  createdOnDate: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
