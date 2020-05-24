import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  initSwagger(app);

  await app.listen(PORT);
}

function initSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Beauty Saloon Api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
