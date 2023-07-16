import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
require('dotenv').config();

async function bootstrap() {
  Sentry.init({
    dsn: 'https://835bf7291bfd40a4a000013b6fa27ee0@o4505504810139648.ingest.sentry.io/4505504865714176'
  });

  try {
    const app = await NestFactory.create(AppModule);
    const port = 3004;

    app.enableCors()

    const config = new DocumentBuilder()
      .setTitle('Jobs')
      .setDescription('Jobs search')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    Sentry.captureException(error);
  }
}

bootstrap();
