import {
  type CheckGRPCServiceOptions,
  type DiskHealthIndicatorOptions,
  type MicroserviceHealthIndicatorOptions,
  type MikroOrmPingCheckSettings,
  type MongoosePingCheckSettings,
  type SequelizePingCheckSettings,
  type TypeOrmPingCheckSettings,
} from "@nestjs/terminus";
import {
  type AxiosRequestConfig,
  type AxiosResponse,
} from "@nestjs/terminus/dist/health-indicator/http/axios.interfaces";
import { type Observable } from "rxjs";

export interface IHealth<
  A,
  M extends MicroserviceOptionsLike,
  G extends GrpcClientOptionsLike = GrpcClientOptionsLike
> {
  Disk?: IDiskOptions | null;
  gRPC?: IGrpcOptions<G> | null;
  HttpPing?: IHttpPingOptions | null;
  HttpRes?: IHttpResOptions<A> | null;
  MemoryRss?: IMemoryRssOptions | null;
  MemoryHeap?: IMemoryHeapOptions | null;
  Microservice?: IMicroserviceOptions<M> | null;
  Mongoose?: IMongooseOptions | null;
  MikroOrm?: IMikroOrmOptions | null;
  Sequelize?: ISequelizeOptions | null;
  TypeOrm?: ITypeOrmOptions | null;
}

export interface ITypeOrmOptions {
  key: string;
  options?: TypeOrmPingCheckSettings;
}

export interface IMongooseOptions {
  key: string;
  options?: MongoosePingCheckSettings;
}

export interface IMikroOrmOptions {
  key: string;
  options?: MikroOrmPingCheckSettings;
}

export interface ISequelizeOptions {
  key: string;
  options?: SequelizePingCheckSettings;
}

export interface IGrpcOptions<GrpcOptions> {
  key: string;
  service: string;
  options?: CheckGRPCServiceOptions<GrpcOptions>;
}

export interface IMicroserviceOptions<MicroserviceClientOptions> {
  key: string;
  options: MicroserviceHealthIndicatorOptions<MicroserviceClientOptions>;
}

export interface IDiskOptions {
  key: string;
  options: DiskHealthIndicatorOptions;
}

export interface IMemoryRssOptions {
  key: string;
  rssThreshold?: number;
}

export interface IMemoryHeapOptions {
  key: string;
  heapUsedThreshold?: number;
}

export interface IHttpPingOptions {
  key: string;
  url: URL | string;
  axiosConfig_and_httpClient?: AxiosRequestConfig & {
    httpClient?: HttpClientLike;
  }; // { httpClient, ...options }
}

export interface IHttpResOptions<A> {
  key: string;
  url: URL | string;
  callback?: (response: AxiosResponse<A>) => Promise<boolean> | boolean;
  axiosConfig_and_httpClient?: AxiosRequestConfig & {
    httpClient?: HttpClientLike;
  };
}

// nest

interface GrpcClientOptionsLike {
  transport?: number;
  options?: any;
}

interface MicroserviceOptionsLike {
  transport?: number;
  options?: object;
}

interface HttpClientLike {
  request: <T = any>(config: any) => Observable<AxiosResponse<T>>;
}
