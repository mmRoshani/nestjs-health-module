import { type DynamicModule } from "@nestjs/common";
import { Module } from "@nestjs/common";

import { HealthController } from "./health.controller";
import { Health } from "./health.enum";
import { type IHealth } from "./health.interface";
import { TerminusModule } from "@nestjs/terminus";

@Module({
  controllers: [HealthController],
  imports: [TerminusModule],
})
export class NestjsHealthModule {
  static register<A, M, G>({
    Disk,
    gRPC,
    HttpPing,
    HttpRes,
    MemoryRss,
    MemoryHeap,
    Microservice,
    Mongoose,
  }: IHealth<A, M, G>): DynamicModule {
    const providers = [
      {
        provide: Health.DISK,
        useValue: Disk,
      },
      {
        provide: Health.GRPC,
        useValue: gRPC,
      },
      {
        provide: Health.HTTP_RES,
        useValue: HttpRes,
      },
      {
        provide: Health.HTTP_PING,
        useValue: HttpPing,
      },
      {
        provide: Health.MEMORY_RSS,
        useValue: MemoryRss,
      },
      {
        provide: Health.MEMORY_HEAP,
        useValue: MemoryHeap,
      },
      {
        provide: Health.MICROSERVICE,
        useValue: Microservice,
      },
      {
        provide: Health.MONGOOSE,
        useValue: Mongoose,
      },
    ];
    return {
      module: NestjsHealthModule,
      providers,
      controllers: [HealthController],
    };
  }
}
