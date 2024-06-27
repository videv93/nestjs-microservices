import { Module } from '@nestjs/common';
import { OutboxService } from './outbox.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Outbox } from './entities/outbox.entity';
import { WORKFLOWS_SERVICE } from '../constants';
import { OutboxProcessor } from './outbox.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Outbox]),
    ClientsModule.register([
      {
        name: WORKFLOWS_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'workflows-service',
        },
      },
    ]),
  ],
  providers: [OutboxService, OutboxProcessor],
})
export class OutboxModule {}
