require('dotenv').config();
////////////////////////////////////////////////////
// Dependencies
////////////////////////////////////////////////////
const express = require('express'); //setting up express 
const app = express ();
const PORT = process.env.PORT || 3001; // hiding the port to practice hiding environment variables


////////////////////////////////////////////////////
// Middleware
////////////////////////////////////////////////////


////////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////////
// testing route to see if connection works
// will switch to redirect after seeing connection works. 
app.get('/', (req, res) => {
	res.redirect("/pokemon/");
})

// RESTful Routes order 
// INDEX - get, NEW - get, CREATE - post , SHOW - get, EDIT - get, UPDATE - put, DESTROY - Delete

// INDEX Route
// Displays homepage to see all of the pokemon
app.get('/pokemon/', (req, res) => {
	res.send('hi');
})

// NEW Route
// Displays form to create a new pokemon
app.get('/pokemon/new/', (req, res) => {

});

// CREATE Route
// Add new pokemon to database and redirects back to homepage or the newly created pokemon
app.post('/pokemon/');

// SHOW Route
// Displays information about a pokemon
app.get('/pokemon/:id/');

// EDIT Route
// Display Edit form for one Pokemon
app.get('/pokemon/:id/');

// UPDATE Route
// Update a particular pokemon's data then redirect to homepage or that pokemon
app.put('/pokemon/:id/');

// DELETE Route
// Delete a pokemon then redirect to homepage or that pokemon
app.delete('/pokemon/:id/');

app.listen(PORT, () => {
	console.log(`You are listening on port ${PORT}`)
});