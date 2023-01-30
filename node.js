// Server setup using Express
const express = require("express");
const app = express();
const port = 3000;

// Fake Pokemon data
const pokemon = [
  { id: 1, name: "Pikachu", type: "Electric" },
  { id: 2, name: "Charizard", type: "Fire/Flying" },
  { id: 3, name: "Squirtle", type: "Water" }
];

// API endpoint to get all Pokemon
app.get("/pokemon", (req, res) => {
  res.json(pokemon);
});

// API endpoint to get a Pokemon by id
app.get("/pokemon/:id", (req, res) => {
  const pokemonId = parseInt(req.params.id);
  const pokemonData = pokemon.find(p => p.id === pokemonId);

  if (!pokemonData) {
    res.status(404).send("Pokemon not found");
  } else {
    res.json(pokemonData);
  }
});

// API endpoint to add a new Pokemon
app.post("/pokemon", (req, res) => {
  const newPokemon = {
    id: pokemon.length + 1,
    name: req.body.name,
    type: req.body.type
  };

  pokemon.push(newPokemon);
  res.send("Pokemon added successfully");
});

// API endpoint to delete a Pokemon by id
app.delete("/pokemon/:id", (req, res) => {
  const pokemonId = parseInt(req.params.id);
  const pokemonIndex = pokemon.findIndex(p => p.id === pokemonId);

  if (pokemonIndex === -1) {
    res.status(404).send("Pokemon not found");
  } else {
    pokemon.splice(pokemonIndex, 1);
    res.send("Pokemon deleted successfully");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
