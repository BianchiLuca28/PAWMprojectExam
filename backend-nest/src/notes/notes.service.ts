import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NoteDocument, Note } from './schemas/note.schema';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private readonly noteModel: Model<NoteDocument>,
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
    return await newNote.save();
  }

  async delete(noteId: string, ownerUserId: string): Promise<Note> {
    const noteValid = await this.noteModel.findOne({
      _id: noteId,
      owner: ownerUserId,
    });
    if (!noteValid) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return await this.noteModel.findByIdAndRemove(noteId);
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

    return await this.noteModel.findOneAndUpdate(
      { _id: noteId },
      {
        $set: {
          title: note.title,
          content: note.content,
          updatedOnDate: new Date().toISOString(),
        },
      },
    );
  }
}
