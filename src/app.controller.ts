import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject('PRINT_QUEUE') private client: ClientProxy,) { }

  @Get()
  async getHello(): Promise<boolean> {
    this.client.emit('print', `{code:2012345678903;option:ean,hri}`);
    return true;
  }
}
