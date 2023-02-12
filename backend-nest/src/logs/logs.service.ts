import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from './schemas/log.schema';
import { Note } from 'src/notes/schemas/note.schema';
import { sanitize, sanitizeMongo } from 'src/shared/utils';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(Log.name) private readonly logModel: Model<LogDocument>,
  ) {}

  async findAll(ownerUserId: string): Promise<Log[]> {
    return await this.logModel.find({ owner: ownerUserId });
  }

  async findOne(logId: string, ownerUserId: string): Promise<Log> {
    return await this.logModel.findOne({
      _id: sanitize(sanitizeMongo(JSON.stringify(logId))),
      owner: ownerUserId,
    });
  }

  async create(noteId: string, note: Note, operation: string) {
    const newLog = new this.logModel({
      noteTitle: note.title,
      operation: operation,
      owner: note.owner,
      referNote: sanitize(sanitizeMongo(JSON.stringify(noteId))),
    });

    return await newLog.save();
  }
}
