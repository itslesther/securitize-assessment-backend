import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Database } from './Database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);

  const database = new Database();
  database.init();
}
bootstrap();
