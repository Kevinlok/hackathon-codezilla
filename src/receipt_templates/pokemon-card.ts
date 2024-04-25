import { Pokemon } from 'src/pokemon/pokemon.service';

export const generatePokemonCard = (pokemon: Pokemon) => {
  return `
|Basic Pokémon
|"^^^${pokemon.name} | ^^${pokemon.hp} HP|
{width: auto; border:line}


{b:none}

${pokemon.moves
  .map((move) => `|"${move.cost} | ${move.name} | "${move.power}`)
  .join('\n\n-\n\n')}

|"type | "ability | "r. cost
|${pokemon.type} | ${pokemon.ability} | ${pokemon.retreatCost}

{w: auto; b: line}
|Description of the pokémens, this ${pokemon.name} is so cool. It has the amazing ability ${pokemon.ability}.
`;
};
