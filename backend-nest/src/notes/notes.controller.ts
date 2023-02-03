import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Note } from './schemas/note.schema';

@Controller('api/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: any): Promise<Note[]> {
    return this.notesService.findAll(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') noteId, @Req() req: any): Promise<Note> {
    return this.notesService.findOne(noteId, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() noteCreated: CreateNoteDto, @Req() req: any): Promise<Note> {
    return this.notesService.create(noteCreated, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') noteId, @Req() req: any): Promise<Note> {
    return this.notesService.delete(noteId, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Body() updatedNote: CreateNoteDto,
    @Param('id') noteId,
    @Req() req: any,
  ): Promise<Note> {
    return this.notesService.update(noteId, updatedNote, req.user._id);
  }
}
