import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NoteDocument, Note } from './schemas/note.schema';
import { CreateNoteDto } from './dto/create-note.dto';
import { LogsService } from 'src/logs/logs.service';
import logsOperations from 'src/logs/logsOperations';
import { sanitize, sanitizeMongo } from 'src/shared/utils';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private readonly noteModel: Model<NoteDocument>,
    private readonly logsService: LogsService,
  ) {}

  async findAll(ownerUserId: string): Promise<Note[]> {
    return await this.noteModel.find({ owner: ownerUserId });
  }

  async findOne(noteId: string, ownerUserId: string): Promise<Note> {
    return await this.noteModel.findOne({
      _id: sanitize(sanitizeMongo(JSON.stringify(noteId))),
      owner: ownerUserId,
    });
  }

  async create(note: CreateNoteDto, ownerUserId: string): Promise<Note> {
    const newNote = new this.noteModel({
      title: sanitize(note.title),
      content: sanitize(note.content),
      owner: ownerUserId,
    });

    const createdNote = await newNote.save();
    if (createdNote)
      await this.logsService.create(
        createdNote._id,
        createdNote,
        logsOperations.addNote,
      );

    return createdNote;
  }

  async delete(noteId: string, ownerUserId: string): Promise<Note> {
    const noteValid = await this.noteModel.findOne({
      _id: sanitize(sanitizeMongo(JSON.stringify(noteId))),
      owner: ownerUserId,
    });
    if (!noteValid) {
      throw new HttpException('Invalid note', HttpStatus.BAD_REQUEST);
    }

    const removedNote = await this.noteModel.findByIdAndRemove(
      sanitize(sanitizeMongo(JSON.stringify(noteId))),
    );
    if (removedNote)
      await this.logsService.create(
        removedNote._id,
        removedNote,
        logsOperations.removeNote,
      );

    return removedNote;
  }

  async update(
    noteId: string,
    note: CreateNoteDto,
    ownerUserId: string,
  ): Promise<Note> {
    const sanitizedNoteId = sanitize(sanitizeMongo(JSON.stringify(noteId)));
    const noteValid = await this.noteModel.findOne({
      _id: sanitizedNoteId,
      owner: ownerUserId,
    });
    if (!noteValid) {
      throw new HttpException('Invalid note', HttpStatus.BAD_REQUEST);
    }

    const updatedNote = await this.noteModel.findOneAndUpdate(
      { _id: sanitizedNoteId },
      {
        $set: {
          title: sanitize(note.title),
          content: sanitize(note.content),
          updatedOnDate: new Date().toISOString(),
        },
      },
    );
    await this.logsService.create(
      updatedNote._id,
      updatedNote,
      logsOperations.updateNote,
    );

    return updatedNote;
  }
}
