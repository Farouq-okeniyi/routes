const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config({path: './config.env'});
const app = require('./app')
// to know the environment variable

    // console.log(app.get('env '))
    console.log(process.env )

mongoose.connect(process.env.Con_String,{  tls: true, // Enable TLS
    tlsAllowInvalidCertificates: true,

}).then((conn)=>{
    console.log(conn);
    console.log("db connected succesfully");
}).catch((err)=>{
    console.log(err)
})

//schema

const moviesscema = new mongoose.Schema({
    Name: String,
    Discription: String,
    Duration: Number,
    Rating: Number

})
    //creating a server
const port = process.env.PORT || 2000;


app.listen(port, ()=>{
    console.log('server has started')
})