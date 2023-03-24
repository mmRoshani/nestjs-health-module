import { Controller, Get, Inject } from "@nestjs/common";
import * as a from "@nestjs/axios";
import {
  DiskHealthIndicator,
  GRPCHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
  MongooseHealthIndicator,
} from "@nestjs/terminus";

import { Health } from "./health.enum";
/**
 *
 * '_' prefix is for options
 *
 */

@Controller("health-status")
export class HealthController {
  private healthRay = [];

  constructor(
    private readonly health: HealthCheckService,
    private readonly disk: DiskHealthIndicator,
    private readonly gRPC: GRPCHealthIndicator,
    private readonly http: HttpHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly microservice: MicroserviceHealthIndicator,
    private readonly mongo: MongooseHealthIndicator,
    /*****************************
     *
     * End of `useClass` providers
     *
     */
    @Inject(Health.DISK) private readonly _disk?,
    @Inject(Health.GRPC) private readonly _gRPC?,
    @Inject(Health.HTTP_PING) private readonly _httpPing?,
    @Inject(Health.HTTP_RES) private readonly _httpRes?,
    @Inject(Health.MEMORY_RSS)
    private readonly _memoryRss?,
    @Inject(Health.MEMORY_HEAP)
    private readonly _memoryHeap?,
    @Inject(Health.MICROSERVICE)
    private readonly _microservice?,
    @Inject(Health.MIKRO_ORM)
    private readonly _mikroOrm?,
    @Inject(Health.MONGOOSE)
    private readonly _mongo?
  ) {
    /**********************************
     *
     *     null("pingCheck")
     *     "_httpRes"("responseCheck")
     *     "_gRPC"("checkService")
     *     "_memoryRss"("checkRSS")
     *     "_memoryHeap"("checkHeap")
     *     "_disk"("pingCheck")
     *     "_httpPing"("pingCheck")
     *     "_microservice"("pingCheck")
     *     "_mikroOrm"("pingCheck")
     *     "_mongo"("pingCheck")
     *     "_sequelize"("pingCheck")
     *     "_typeOrm"("pingCheck")
     *
     */

    Object.keys(this).forEach((key) => {
      if (key.startsWith("_") && this[key] !== null) {
        console.log(key);
        const value = this[key];
        switch (key) {
          case "_gRPC":
            this.healthRay.push(() =>
              this.gRPC.checkService(value.key, value.options)
            );
            break;

          case "_disk":
            this.healthRay.push(() =>
              this.disk.checkStorage(value.key, value.options)
            );
            break;

          case "_memoryRss":
            this.healthRay.push(() =>
              this.memory.checkRSS(value.key, value.options)
            );
            break;

          case "_memoryHeap":
            this.healthRay.push(() =>
              this.memory.checkHeap(value.key, value.options)
            );
            break;

          case "_httpPing":
            this.healthRay.push(() =>
              this.http.pingCheck(value.key, value.options)
            );
            break;

          case "_microservice":
            this.healthRay.push(() =>
              this.microservice.pingCheck(value.key, value.options)
            );
            break;
          case "_mongo":
            this.healthRay.push(() =>
              this.mongo.pingCheck(value.key, value.options)
            );
            break;
          case "_memoryRss":
            this.healthRay.push(
              () =>
                this.http.responseCheck <
                this._httpRes >
                (value.key, value.options)
            );
            break;

          default:
            console.log("**Health check miss, check the given options**");
            break;
        }
      }
    });
  }

  @Get()
  @HealthCheck()
  async check() {
    return this.health.check(this.healthRay);
  }
}
