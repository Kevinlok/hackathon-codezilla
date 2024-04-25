import { Pokemon } from '../pokemon/pokemon.service';

export const generatePokemonCard = (pokemon: Pokemon) => {
  return `
|Basic Pokémon
|"^^^${pokemon.name} | ^^${pokemon.hp} HP|
{width: auto; border:line}

{image:${pokemon.image}}

{b:none}

${pokemon.moves
  .map((move) => `|"${move.cost} | ${move.name} | "${move.power}`)
  .join('\n\n-\n\n')}

|"type | "ability | "r. cost
|${pokemon.type} | ${pokemon.ability} | ${pokemon.retreatCost}

{w: auto; b: line}
|${pokemon.description}.
`;
};
