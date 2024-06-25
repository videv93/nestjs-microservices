import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AlarmsServiceController {
  private readonly logger = new Logger(AlarmsServiceController.name);

  @EventPattern('alarm.create')
  create(@Payload() createAlarmDto: unknown) {
    this.logger.debug(
      `Received new "alarm.created" event:  ${JSON.stringify(createAlarmDto)}`,
    );
  }
}
