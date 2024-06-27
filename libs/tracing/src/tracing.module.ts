import { Module } from '@nestjs/common';
import { TracingService } from './tracing.service';
import { NatsClientModule } from './nats-client/nats-client.module';
import { TracingLogger } from './tracing.logger';

@Module({
  imports: [NatsClientModule],
  providers: [TracingService, TracingLogger],
  exports: [TracingService, TracingLogger],
})
export class TracingModule {}
