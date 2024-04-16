import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxyFactory, ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'PRINT_QUEUE',
      useFactory: (configService: ConfigService) => {
        const rabbitMqServer = configService.get<string>('RABBIT_MQ_SERVER');
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [rabbitMqServer],
            queue: 'ticket_printer_queue',
            queueOptions: {
              durable: false
            },
          }
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule { }
