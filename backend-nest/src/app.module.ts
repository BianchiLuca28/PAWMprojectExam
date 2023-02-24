import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LogsModule } from './logs/logs.module';
import keys from './config/keys';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    NotesModule,
    MongooseModule.forRoot(keys.mongoURI),
    AuthModule,
    UsersModule,
    LogsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'www'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
