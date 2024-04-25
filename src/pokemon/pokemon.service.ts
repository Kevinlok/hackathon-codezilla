import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { urlToBase64String } from '../../cli/urlToBase64String';

export interface Pokemon {
  name: string;
  hp: number;
  moves: {
    power: number;
    cost: number;
    name: string;
  }[];
  type: string;
  ability: string;
  image: string;
  retreatCost: number;
  description: string;
}

@Injectable()
export class PokemonService {
  constructor(private httpService: HttpService) {}

  getPokemon(pokemonName: string): Observable<Promise<Pokemon>> {
    return this.httpService
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .pipe(map((response) => response.data))
      .pipe(map((response) => this.createPokemonEntity(response)));
  }

  async createPokemonEntity(pokemon: any): Promise<Pokemon> {
    const randomizedMoves = pokemon.moves
      .map((move) => move.move.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const image = await urlToBase64String(
      pokemon.sprites.other['official-artwork'].front_default,
    );

    const description = await this.httpService
      .get(
        `https://pokeapi.co/api/v2/ability/${pokemon.abilities[0].ability.name}/`,
      )
      .pipe(map((response) => response.data.effect_entries[0].short_effect))
      .toPromise();

    return {
      name:
        pokemon.species.name.charAt(0).toUpperCase() +
        pokemon.species.name.slice(1),
      hp: pokemon.base_experience,
      moves: randomizedMoves.map((move) => this.createMoveEntity(move)),
      type: pokemon.types[0].type.name,
      ability: pokemon.abilities[0].ability.name,
      image,
      retreatCost: Math.floor(Math.random() * 3) + 1,
      description,
    };
  }

  createMoveEntity(move: any) {
    return {
      name: move.charAt(0).toUpperCase() + move.slice(1),
      cost: this.getCost(Math.floor(Math.random() * 3) + 1),
      power: Math.floor(Math.random() * 999),
    };
  }

  getCost(cost: number) {
    switch (cost) {
      case 1:
        return '*';
      case 2:
        return '**';
      case 3:
        return '***';
    }
  }
}
