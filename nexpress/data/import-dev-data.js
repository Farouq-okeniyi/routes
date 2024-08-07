const mongoose = require('mongoose')
const dotenv = require('dotenv')
const fs = require('fs')
const movie = require('./../model/moviemodel')

dotenv.config({path: './config.env'})


// mongo schema

mongoose.connect(process.env.mongodbstr//localhost:27017/cinetflix
    ,{ 
    tls: true, // Enable TLS
    tlsAllowInvalidCertificates: true,
    ssl: true,

}).then((conn)=>{
    // console.log(conn);
    console.log("db connected succesfully");
}).catch((err)=>{
    console.log(err)
})



//read movie json

const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

//delete existing movies

async function DeleteMovies(){
    try {
        await movie.deleteMany();
        console.log("Data Succesfully Deleted")
    } catch (error) {
        console.log(error.message)
    }
    process.exit()
}

//Importing movies from our Movies.json file

async function CreateMovies(){
    try{
        await movie.create(movies);
        console.log("Data Succesfully Imported")
    } catch (error) {
        console.log(error.message)
    }
}

// calling our functions

if(process.argv[2]==='--import'){
    CreateMovies();
    
}
if(process.argv[2]==='--delete'){
    DeleteMovies();

}