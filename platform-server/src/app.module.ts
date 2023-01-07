import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './file/file.module';
import * as path from 'path';

dotenv.config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    TrackModule,
    FileModule,
  ],
})
export class AppModule {}
