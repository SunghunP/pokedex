// require to get environment variables
require('dotenv').config();

////////////////////////////////////////////////////
// Dependencies
////////////////////////////////////////////////////
const express = require('express'); //setting up express 
const app = express ();
const PORT = process.env.PORT || 3001; // hiding the port to practice hiding environment variables
const pokemon = require('./models/pokemon.js'); // pulls all of the pokemon data
const methodOverride = require("method-override"); // YOU MUST DO THIS FOR PUT METHODS!!! SPENT # HRS TRYING TO FIGURE THIS OUT 
// IM LEAVING NOTES SO I DONT FORGET NEXT TIME - ALSO DONT FORGET TO npm i method-override!!!!
let counter = 151

////////////////////////////////////////////////////
// Middleware
////////////////////////////////////////////////////
app.use(express.urlencoded({extended: true})); // body parser - have to set to true to be able to create muti-level objects
app.use("/static", express.static("public")); // files for public view & to use/link to other files.
app.use(methodOverride("_method")); 

////////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////////
// testing route to see if connection works
// will switch to redirect after seeing connection works. 
app.get('/', (req, res) => {
	res.redirect("/pokemon/");
});

// RESTful Routes order 
// INDEX - get, NEW - get, CREATE - post , SHOW - get, EDIT - get, UPDATE - put, DESTROY - Delete

// INDEX Route
// Displays homepage to see all of the pokemon
app.get('/pokemon/', (req, res) => {
	res.render('pokemon_index.ejs', {allPokemon : pokemon});
});

// NEW Route
// Displays form to create a new pokemon
app.get('/pokemon/new/', (req, res) => {
	// A simple way to count the number of pokemon and use it as the id value
	counter += 1
	res.render('pokemon_new.ejs', {pokemonId : counter});
});

// CREATE Route
// Add new pokemon to database and redirects back to homepage or the newly created pokemon
app.post('/pokemon/', (req, res) => {
	pokemon.push(req.body);
	res.redirect('/pokemon/');
});

// SHOW Route
// Displays information about a pokemon
app.get('/pokemon/:id/', (req, res) => {
	const id = req.params.id;
	// res.send(pokemon[id]);
	res.render('pokemon_show.ejs', {
		pokemonById : pokemon[id],
		id : id,
	});
});

// EDIT Route
// Display Edit form for one Pokemon
app.get('/pokemon/:id/edit', (req, res) => {
	const id = req.params.id;
	res.render('pokemon_edit.ejs', {
		pokemonById : pokemon[id],
		id : id
	});
});

// UPDATE Route
// Update a particular pokemon's data then redirect to homepage or that pokemon
app.put('/pokemon/:id/', (req, res) => {
	const id = req.params.id;
	console.log(req.body)
	pokemon[id] = req.body;
	res.redirect("/pokemon/");
});

// DELETE Route
// Delete a pokemon then redirect to homepage
app.delete('/pokemon/:id/', (req, res) => {
	const id = req.params.id 
	pokemon.splice(id, 1)
	res.redirect('/pokemon/')
});

// decides the port that the website will be held at.
app.listen(PORT, () => {
	console.log(`You are listening on port ${PORT}`);
});

// How to copy & edit an object without losing the structure and data of the object. 
// 1. Make a copy of the object at PokemonArray at the index and assign it to a new variable (...pokemon[req.params.id])
// 2. verify that req.body is structured in the format that matches what your new object has.
// 3. use object .assign to add req.body to our object copy. 
// 4. Update pokemonArray[req.params.id] to the new object