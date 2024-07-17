const http = require('http');
const express =require('express');
const fs = require('fs')
const app = express();
const morgan = require('morgan');
// const userdata = JSON.parse(fs.writeFileSync('./data/userlogin.json'))
const userdetails = JSON.parse(fs.readFileSync('./data/userlogin.json', 'utf-8'))
const router = express.Router();

// function getuserdata(req, res){

//     res.status(201).json({
//         status:"succesful",
//         data: userdetails
//     });

// }

function verfyusername(req, res){
    const Uname= req.body.username;
    console.log(Uname)
    const Upassword= req.body.password;
    const Uemail= req.body.email;

    const check = userdetails.find((el)=>{
        return el.username == Uname;
    })

    if(!check){
        return res.status(404).json({
            status:"User Doesnt Exist",
            message:"please try again or create a new user",

        });
    }

    if( check.password != Upassword && check.email != Uemail){
        return res.status(404).json({
            status:"User does not exist",
            message:"please create an account",

        });
    }else if(check.password != Upassword && check.email === Uemail){

        return res.status(404).json({
            status:"incorrect Password ",
            message:"please try agian",

        });

    }else if(check.password != Upassword || check.email != Uemail){

        return res.status(404).json({
            status:"incorrect logins detains",
            message:"please try agian",

        });

    }
    res.status(200).json({
        status:"succesful",
        message:"you have succesfully logged in"
    })
}

router.route('/')
    .post(verfyusername)


app.use(express.json())
app.use(morgan('dev'))
app.use('/api/v2/login', router);

app.listen(4000,()=>{
    console.log("server is live")
})