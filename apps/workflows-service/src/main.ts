import { NestFactory } from '@nestjs/core';
import { WorkflowsServiceModule } from './workflows-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // using NestFactory.create allows us to create hybrid apps that supports both http and nats entry points
  // useful when we want to expose http endpoints for health checks or metrics
  const app = await NestFactory.create(WorkflowsServiceModule);
  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.NATS,
      options: {
        servers: process.env.NATS_URL,
        queue: 'workflows-service',
      },
    },
    {
      // inherit global pipes from the http application
      inheritAppConfig: true,
    },
  );
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
