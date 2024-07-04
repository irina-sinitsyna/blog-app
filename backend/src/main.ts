import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Blog Platform API')
    .setDescription('API documentation for Blog Platform Application')
    .setVersion('1.0')
    .addTag('blog-posts', 'Operations related to Blog Posts')
    .addTag('comments', 'Operations related to Comments')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
