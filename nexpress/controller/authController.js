const User = require('./../model/userModel');
const asyncErrorHandler = require('./../utility/asyncErrorHandling')

const sighup = async function(req, res, next){
    const  newUser = await User.create(req.body)

    res.status(200).json({
        status:'Succesful',
        data:{
            newUser
        }
    })
}

module.exports ={
    sighup:asyncErrorHandler(sighup)
}