const http = require('http');
const express =require('express');
const fs = require('fs')
const app = express();
const morgan = require('morgan')

app.use(express.json())
app.use(morgan('dev'))

module.exports=apphud;