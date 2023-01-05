import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

const start = async () => {
  try {
    const PORT = process.env.PORT;
    const app = await NestFactory.create(AppModule);

    await app.listen(PORT, () => {});
  } catch (e) {
    console.log(e);
  }
};

start();
