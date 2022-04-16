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
	res.render('pokemon_new.ejs', {pokemonId : pokemon.length + 1});
});

// CREATE Route
// Add new pokemon to database and redirects back to homepage or the newly created pokemon
app.post('/pokemon/', (req, res) => {
	pokemon.push(req.body)
	res.redirect('/pokemon/');
});

// SHOW Route
// Displays information about a pokemon
app.get('/pokemon/:id/', (req, res) => {
	// I have to subtract one to the given id because in pokemon_index.ejs 
	// I added 1 to the href of the a tag to get to the selected pokemon
	// since I wanted the link of the pokemon to match the id of the pokemon.
	const id = req.params.id - 1;
	// res.send(pokemon[id]);
	res.render('pokemon_show.ejs', {pokemonById : pokemon[id]});
});

// EDIT Route
// Display Edit form for one Pokemon
app.get('/pokemon/:id/edit', (req, res) => {
	const id = req.params.id - 1;
	res.render('pokemon_edit.ejs', {pokemonById : pokemon[id]});
});

// UPDATE Route
// Update a particular pokemon's data then redirect to homepage or that pokemon
app.put('/pokemon/:id/', (req, res) => {
	console.log(req.body)
	const id = req.params.id - 1;
	pokemon[id] = req.body;
	res.redirect("/pokemon/");
});

// DELETE Route
// Delete a pokemon then redirect to homepage
app.delete('/pokemon/:id/', (req, res) => {

});

// decides the port that the website will be held at.
app.listen(PORT, () => {
	console.log(`You are listening on port ${PORT}`);
});