import { Controller, UseGuards, Get, Body, Req, Param } from '@nestjs/common';
import { LogsService } from './logs.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Log } from './schemas/log.schema';

@Controller('api/logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: any): Promise<Log[]> {
    return this.logsService.findAll(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') noteId, @Req() req: any): Promise<Log> {
    return this.logsService.findOne(noteId, req.user._id);
  }
}
