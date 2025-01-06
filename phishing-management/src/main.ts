import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';

async function bootstrap() {
  const logger = new Logger();
  logger.log(`Database URL: ${process.env.MONGO_URI}`);
  logger.log(`JWT Secret: ${process.env.JWT_SECRET}`);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(passport.initialize());
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  const port = 3001;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
