import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './app/auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  // Set a global prefix for all API routes
  app.setGlobalPrefix('api');

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*',
  });

  // Apply the JWT Auth Guard globally
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  await app.listen(port, () => {
    console.log(`Backend is running on http://localhost:${port}/api`);
  });
}
bootstrap();
