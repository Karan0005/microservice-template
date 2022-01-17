import { HealthCheckSuccessResponse, SwaggerMessage } from '@corporate/utilities';
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheckService, HttpHealthIndicator, DiskHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';

@Controller('')
@ApiTags('Root')
export class AppController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private configService: ConfigService,
    private memoryHealthIndicator: MemoryHealthIndicator,
    private diskHealthIndicator: DiskHealthIndicator
  ) {}

  @Get()
  @ApiExcludeEndpoint()
  getWelcomeMessage() {
    return { Info: 'Welcome to Notification Microservice' };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health Route' })
  @ApiResponse({
    status: SwaggerMessage.Response.OK.Status,
    description: SwaggerMessage.Response.OK.Description,
    type: HealthCheckSuccessResponse
  })
  check() {
    const daprHealthURL: string = this.configService.get('dapr.healthEndpoint') || '';
    return this.health.check([
      // To Check DAPR Status
      () => this.http.pingCheck('DAPR', daprHealthURL),
      // The process should not use more than 300MB memory
      () => this.memoryHealthIndicator.checkHeap('HEAP Memory', 300 * 1024 * 1024),
      // The process should not have more than 300MB RSS memory allocated
      () => this.memoryHealthIndicator.checkRSS('RSS Memory', 300 * 1024 * 1024),
      // The used disk storage should not exceed the 50% of the available space
      () => this.diskHealthIndicator.checkStorage('DISK Health', { thresholdPercent: 0.5, path: __dirname })
    ]);
  }
}
