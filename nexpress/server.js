const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({path: './config.env'});
const app = require('./app')
// to know the environment variable

    // console.log(app.get('env '))
    // console.log(process.env)

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

const port = process.env.PORT || 2000;


app.listen(port, ()=>{
    console.log('server has started')
})
    //new document
    
    // const newmovies = new Moviee({
    //     Name:"die trying",
    //     Discription:"hwqgd eycvus",
    //     Duration: 210,
    //     Rating: 10
        
    // })
    
    // newmovies.save().then(doc =>{console.log(doc)}).catch(err=>{console.log(err)})
        //creating a server