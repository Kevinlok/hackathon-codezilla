import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxyFactory, ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PokemonService } from './pokemon/pokemon.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PokemonService,
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
