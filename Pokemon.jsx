import { useEffect, useState } from "react";
import { PokemonCard } from "./pokemoncardds";
import "./Pokemon.css";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const Api = "https://pokeapi.co/api/v2/pokemon?limit=30";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(Api);
      const data = await res.json();
      const pokemonDetailsPromises = data.results.map(async (current) => {
        const res = await fetch(current.url);
        const data = await res.json();
        return data;
      });

      const details = await Promise.all(pokemonDetailsPromises);
      console.log(details);

      setPokemon(details);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
    document.title = 'PokemonByMayank';
  }, []);

  const pokemonsearch = pokemon.filter((currentpokemon) =>
    currentpokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <h1>Loading.....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <h1>{error.message}</h1>
      </>
    );
  }

  

  return (
    <>
      <header>
        <h1>Welocme To Pokemon World</h1>
      </header>
      <div className="search">
        <input
          type="text"
          placeholder="enter pokemon name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        <ul className="grid grid-three-cols">
          {pokemonsearch.map((current) => {
            return <PokemonCard key={current.id} current={current} />;
          })}
        </ul>
      </div>
    </>
  );
};
