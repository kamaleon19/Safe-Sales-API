import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'ping-pong: Determina que la API este funcionando correctamente' })
  @ApiResponse({ status: 200, description: 'pong' })
  @Get('ping')
  ping(): string {
    return this.appService.pong();
  }
}
