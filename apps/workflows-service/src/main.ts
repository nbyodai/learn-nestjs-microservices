import { NestFactory } from '@nestjs/core';
import { WorkflowsServiceModule } from './workflows-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // using NestFactory.create allows us to create hybrid apps that supports both http and nats entry points
  // useful when we want to expose http endpoints for health checks or metrics
  const app = await NestFactory.create(WorkflowsServiceModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: process.env.NATS_URL,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
