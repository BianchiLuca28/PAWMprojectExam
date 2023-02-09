import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NoteDocument, Note } from './schemas/note.schema';
import { CreateNoteDto } from './dto/create-note.dto';
import { LogsService } from 'src/logs/logs.service';
import logsOperations from 'src/logs/logsOperations';

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
    return await this.noteModel.findOne({ _id: noteId, owner: ownerUserId });
  }

  async create(note: CreateNoteDto, ownerUserId: string): Promise<Note> {
    const newNote = new this.noteModel({
      title: note.title,
      content: note.content,
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
      _id: noteId,
      owner: ownerUserId,
    });
    if (!noteValid) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const removedNote = await this.noteModel.findByIdAndRemove(noteId);
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
    const noteValid = await this.noteModel.findOne({
      _id: noteId,
      owner: ownerUserId,
    });
    if (!noteValid) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const updatedNote = await this.noteModel.findOneAndUpdate(
      { _id: noteId },
      {
        $set: {
          title: note.title,
          content: note.content,
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
