import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class PokemonService {
  constructor(private httpService: HttpService) {}

  getPokemon(pokemonName: string): any {
    return this.httpService
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .pipe(map((response) => response.data))
      .pipe(map((response) => this.createPokemonEntity(response)));
  }

  createPokemonEntity(pokemon: any) {
    const randomizedMoves = pokemon.moves
      .map((move) => move.move.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    return {
      name: pokemon.species.name,
      hp: pokemon.base_experience,
      moves: randomizedMoves,
      type: pokemon.types[0].type.name,
      ability: pokemon.abilities[0].ability.name,
      image: pokemon.sprites.other['official-artwork'].front_default,
    };
  }
}
