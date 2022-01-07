import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserModule } from './api/user/user.module';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['http://127.0.0.1:5500'] });
  const config = new DocumentBuilder()
    .setTitle('Nest-Js Application')
    .setDescription('Configuring Swagger')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [UserModule],
  });
  SwaggerModule.setup('api-doc', app, document);
  await app.listen(3000);
}
bootstrap();
