import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from './schemas/log.schema';
import { Note } from 'src/notes/schemas/note.schema';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(Log.name) private readonly logModel: Model<LogDocument>,
  ) {}

  async findAll(ownerUserId: string): Promise<Log[]> {
    return await this.logModel.find({ owner: ownerUserId });
  }

  async findOne(logId: string, ownerUserId: string): Promise<Log> {
    return await this.logModel.findOne({ _id: logId, owner: ownerUserId });
  }

  async create(noteId: string, note: Note, operation: string) {
    const newLog = new this.logModel({
      noteTitle: note.title,
      operation: operation,
      owner: note.owner,
      referNote: noteId,
    });

    return await newLog.save();
  }
}
