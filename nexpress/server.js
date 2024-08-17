const dotenv = require('dotenv')
const mongoose = require('mongoose')

process.on('uncaughtException', (err)=>{
    console.log(err.name, err.message)
    console.log('Unhandled Rejection Occured! Shutting Down.....')
    
    process.exit(1)
    
})

dotenv.config({path: './config.env'});
const app = require('./app')
// to know the environment variable

    // console.log(app.get('env '))
    // console.log(process.env)
    
    mongoose.connect(process.env.local_con_string//localhost:27017/cinetflix
        ,{ 
            // tls: true ,// Enable TLS
            // tlsAllowInvalidCertificates: true,
            // ssl: true,
            
        }).then((conn)=>{
            // console.log(conn);
            console.log("db connected succesfully");
        })
        
    const port = process.env.PORT || 2000;
        
        
        app.listen(port, ()=>{
            console.log('server has started')
        })
        
        process.on('unhandledRejection', (err)=>{
            console.log(err.name, err.message)
            console.log('Unhandled Rejection Occured! Shutting Down.....')
                process.exit(1)
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