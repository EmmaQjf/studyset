// create the express object and add my middleware 
const express = require('express') // return a function
const app = express() // call the function and return an object
const wordRoute = require('./routes/wordRouter')

//middleware
//app.use is a function , inside is an function
app.use(express.json()) // bodyParser middleware for json apis
app.use(express.urlencoded({extended: true})) //bodyparser middleware for SSR apps 
app.use('/words', wordRoute)
//bodyparser  convert the data in the request body to data that the javascript can read 
//http protocol  request can be done in various languages. change the data to javascript object so we can manipulate 

module.exports = app