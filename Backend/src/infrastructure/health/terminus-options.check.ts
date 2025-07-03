import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TerminusOptionsService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly mongoose: MongooseHealthIndicator, // Add Mongoose indicator
  ) {}

  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('google', 'https://google.com'),
      () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
      () => this.mongoose.pingCheck('mongodb', { timeout: 1500 }), // Add MongoDB check
    ]);
  }
}
