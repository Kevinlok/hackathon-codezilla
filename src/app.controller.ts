import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { PokemonService } from './pokemon/pokemon.service';
import { generateMultilineReceipt } from './receipt_templates/multi_line';
import { generatePokemonCard } from './receipt_templates/pokemon-card';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PRINT_QUEUE') private client: ClientProxy,
    private pokemonService: PokemonService,
  ) {}

  @Get()
  async basic(@Query('pokemonName') pokemonName): Promise<boolean> {
    this.pokemonService.getPokemon(pokemonName).subscribe(async (pokemon) => {
      this.client.emit('print', generatePokemonCard(await pokemon));
      console.log(await pokemon);
    });
    return true;
  }

  @Get('/vote')
  async multi(): Promise<boolean> {
    this.client.emit(
      'print',
      generateMultilineReceipt(3),
    );
    return true;
  }
}
