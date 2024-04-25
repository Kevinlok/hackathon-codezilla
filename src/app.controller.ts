import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { PokemonService } from './pokemon/pokemon.service';
import { generateMultilineReceipt } from './receipt_templates/multi_line';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PRINT_QUEUE') private client: ClientProxy,
    private pokemonService: PokemonService,
  ) {}

  @Get()
  async basic(@Query('pokemonName') pokemonName): Promise<boolean> {
    console.log({ pokemonName });
    this.pokemonService.getPokemon(pokemonName).subscribe((pokemon) => {
      console.log({ pokemon });
    });
    return true;
  }

  @Get('/multi')
  async multi(): Promise<boolean> {
    this.client.emit(
      'print',
      generateMultilineReceipt(['Beer', 'Nachos', 'Guacamole']),
    );
    return true;
  }
}
