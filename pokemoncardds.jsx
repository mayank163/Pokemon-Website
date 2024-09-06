import "./Pokemon.css";
import React, { useState } from 'react';

const Specs = ({ current }) => (
  <>
    <p className="card-title">Name: {current.name}</p>
    <p className="card-description">Height: {current.height}</p>
    <p className="card-description">Weight: {current.weight}</p>
    <p className="card-description">Length: {current.types.length}</p>
  </>
);

export const PokemonCard = ({ current }) => {
  const [showSpecs, setShowSpecs] = useState(false);

  return (
    <>
      <div className="grid-three-cols">
        <div className="card-content">
          <figure>
            <img
              src={current.sprites.other.dream_world.front_default}
              alt={current.name}
            />
          </figure>
          <div className="typeofpokemon">
            <h3>{current.types.map((cur) => cur.type.name).join(" , ")}</h3>
          </div>
          <div>
            <button onClick={() => setShowSpecs(!showSpecs)}>Specs</button>
            {showSpecs && <Specs current={current} />}
          </div>
        </div>
      </div>
    </>
  );
};
