// import { prompt } from '@maykoncapellari/cli-builder';
import { getResponse } from './getResponse.mjs';

const choosePokemon = async () => {
  const pokemonName = 'Pikachu';
  // const pokemonName = await prompt.question('Wat is je favoriete Pokémon? ');
  console.log(`${pokemonName}, ik kies jou!`);

  try {
    await getResponse(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`,
    );
  } catch (error) {
    console.error(`Je Pokémon "${pokemonName}" slaapt nog. Kies een ander`);
    return await choosePokemon();
  }

  await getResponse(`http://localhost:5001?pokemonName=${pokemonName.toLowerCase()}`);
};

await choosePokemon();

process.exit(0);
