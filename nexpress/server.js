const dotenv = require('dotenv')
dotenv.config({path: './config.env'});
const app = require('./app')
// to know the environment variable

    // console.log(app.get('env '))
    console.log(process.env )
//creating a server
const port = process.env.PORT || 2000;


app.listen(port, ()=>{
    console.log('server has started')
})