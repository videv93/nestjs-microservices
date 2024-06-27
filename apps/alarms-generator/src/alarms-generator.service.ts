import { Inject, Injectable } from '@nestjs/common';
import { ALARMS_SERVICE } from './constants';
import { ClientProxy, NatsRecordBuilder } from '@nestjs/microservices';
import { Interval } from '@nestjs/schedule';
import { TracingService } from '@app/tracing';
import * as nats from 'nats';

@Injectable()
export class AlarmsGeneratorService {
  constructor(
    @Inject(ALARMS_SERVICE) private readonly alarmsService: ClientProxy,
    private readonly tracingService: TracingService,
  ) {}

  @Interval(10000)
  generateAlarms() {
    const headers = nats.headers();
    headers.set('traceId', this.tracingService.generateTraceId());

    const alarmCreatedEvent = {
      name: 'Alarm #' + Math.floor(Math.random() * 1000) + 1,
      buildingId: Math.floor(Math.random() * 100) + 1,
    };

    const natsRecord = new NatsRecordBuilder(alarmCreatedEvent)
      .setHeaders(headers)
      .build();

    // console.log(`Emitting alarm: ${JSON.stringify(alarmCreatedEvent)}`);
    this.alarmsService.emit('alarm.create', natsRecord);
  }
}
