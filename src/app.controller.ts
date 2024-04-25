import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { generateMultilineReceipt } from './receipt_templates/multi_line';
import { generatePokemonCard } from './receipt_templates/pokemon-card';
import { PokemonService } from './pokemon/pokemon.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PRINT_QUEUE') private client: ClientProxy,
    private pokemonService: PokemonService,
  ) {}

  @Get()
  async basic(): Promise<boolean> {
    // this.client.emit('print', generatePokemonCard('pikachu'));
    this.pokemonService.getPokemon('pikachu').subscribe((pokemon) => {
      console.log(pokemon);
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
