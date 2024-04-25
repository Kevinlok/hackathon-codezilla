import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { urlToBase64String } from '../../cli/urlToBase64String';

@Injectable()
export class PokemonService {
  constructor(private httpService: HttpService) {}

  getPokemon(pokemonName: string): any {
    return this.httpService
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .pipe(map((response) => response.data))
      .pipe(map((response) => this.createPokemonEntity(response)));
  }

  async createPokemonEntity(pokemon: any) {
    const randomizedMoves = pokemon.moves
      .map((move) => move.move.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const image = await urlToBase64String(pokemon.sprites.front_default);

    return {
      name: pokemon.species.name,
      hp: pokemon.base_experience,
      moves: randomizedMoves,
      type: pokemon.types[0].type.name,
      ability: pokemon.abilities[0].ability.name,
      image,
    };
  }
}
