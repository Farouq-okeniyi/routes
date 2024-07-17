const http = require('http')
const express =require('express');
const fs = require('fs')
const movies = JSON.parse(fs.readFileSync('./data/movies.json'))
const app = express();
const morgan = require('morgan')
const MovieRoute = require('./routes/movieroutes')



app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('./public'))
app.use('/api/v1/movies', MovieRoute)
      
  
module.exports = app