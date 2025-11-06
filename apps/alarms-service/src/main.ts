import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AlarmsServiceModule } from './alarms-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // using NestFactory.create allows us to create hybrid apps that supports both http and nats entry points
  // useful when we want to expose http endpoints for health checks or metrics
  const app = await NestFactory.create(AlarmsServiceModule);
  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.NATS,
      options: {
        servers: process.env.NATS_URL,
        queue: 'alarms-service',
      },
    },
    {
      // inherit global pipes from the http application
      inheritAppConfig: true,
    },
  );
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
