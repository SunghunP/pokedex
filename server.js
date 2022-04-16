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
app.get('/', (req, res) => {
	res.send("You are home")
})

app.listen(PORT, () => {
	console.log(`You are listening on port ${PORT}`)
});