import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { generateInvoiceReceipt } from './receipt_templates/invoice';
import { generateMultilineReceipt } from './receipt_templates/multi_line';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject('PRINT_QUEUE') private client: ClientProxy,) { }

  @Get()
  async basic(): Promise<boolean> {
    this.client.emit('print', generateInvoiceReceipt());
    return true;
  }

  @Get('/multi')
  async multi(): Promise<boolean> {
    this.client.emit('print', generateMultilineReceipt(['Beer', 'Nachos', 'Guacamole']));
    return true;
  }
}
