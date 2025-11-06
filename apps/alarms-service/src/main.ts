import { NestFactory } from '@nestjs/core';
import { AlarmsServiceModule } from './alarms-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AlarmsServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
