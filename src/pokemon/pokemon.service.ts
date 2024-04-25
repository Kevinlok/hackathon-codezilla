import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

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
}

@Injectable()
export class PokemonService {
  constructor(private httpService: HttpService) {}

  getPokemon(pokemonName: string): any {
    return this.httpService
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .pipe(map((response) => response.data))
      .pipe(map((response) => this.createPokemonEntity(response)));
  }

  createPokemonEntity(pokemon: any): Pokemon {
    const randomizedMoves = pokemon.moves
      .map((move) => move.move.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    return {
      name: pokemon.species.name,
      hp: pokemon.base_experience,
      moves: randomizedMoves.map((move) => this.createMoveEntity(move)),
      type: pokemon.types[0].type.name,
      ability: pokemon.abilities[0].ability.name,
      image: pokemon.sprites.other['official-artwork'].front_default,
      retreatCost: Math.floor(Math.random() * 3) + 1,
    };
  }

  createMoveEntity(move: any) {
    return {
      name: move,
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
