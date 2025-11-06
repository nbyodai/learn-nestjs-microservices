import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AlarmsServiceController {
  private readonly logger = new Logger(AlarmsServiceController.name);

  @EventPattern('alarm.created')
  create(@Payload() data: unknown) {
    this.logger.debug(
      `Received new "alarm.created" event: ${JSON.stringify(data)}`,
    );
  }
}
// EventPattern decorator marks the method as an event handler. They are not expected to return a response (this is how they differ from the MessagePattern decorator and handler).
