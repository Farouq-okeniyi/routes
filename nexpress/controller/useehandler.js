const fs = require('fs')

const UserDetails = JSON.parse( fs.readFileSync('./data/userlogin.js'))

function verifyuser(req,res,next){
    const checkinfo = UserDetails.find((det)=>{
        
    })
}