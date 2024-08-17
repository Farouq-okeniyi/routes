const express =require('express');
const app = express();
const morgan = require('morgan')
const MovieRoute = require('./routes/movieroutes');
const authRoute = require('./routes/userRoutes')
const { error } = require('console');
const CustomError = require('./utility/customError')
const globalErrorHandling = require('./controller/errorController')


app.use(express.json())

if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}
if(process.env.NODE_ENV ==='production'){
    console.log('production')
    // app.use(morgan('dev'))
}

app.use(express.static('./public'))
app.use('/api/v1/movies', MovieRoute)
app.use('/api/v1/user', authRoute)

app.all('*',(req, res, next)=>{
    const err = new CustomError((`cant find ${req.originalUrl} on server`), 404)
    err.status = 'fail'
    err.statusCode = 404

    next(err);
})

app.use(globalErrorHandling)
      
  
module.exports = app