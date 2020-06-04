import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { API_PREFIX, PORT } from './shared/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix(API_PREFIX);

  initSwagger(app);  

  await app.listen(PORT);
}

function initSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Beauty Saloon Api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${API_PREFIX}/swagger`, app, document);
}

bootstrap();
