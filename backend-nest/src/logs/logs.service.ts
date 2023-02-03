import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from './schemas/log.schema';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(Log.name) private readonly noteModel: Model<LogDocument>,
  ) {}

  async findAll(ownerUserId: string): Promise<Log[]> {
    return await this.noteModel.find({ owner: ownerUserId });
  }

  async findOne(logId: string, ownerUserId: string): Promise<Log> {
    return await this.noteModel.findOne({ _id: logId, owner: ownerUserId });
  }

  async create() {}
}
