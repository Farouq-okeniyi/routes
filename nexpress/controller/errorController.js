const CustomError = require("../utility/customError")

const devErrors = (res,error)=>{
        res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error:error
    })

}

const prodErrors = (res,error)=>{
    if(error.isOperational){
        res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        })

    }else{
        res.status(500).json({
            status:'error',
            message:'Something went wrong please try again later    '
        })
    }

}

const castErrorHandler = (err)=>{
    const msg = `Invalid valid ${err.path} for field ${err.value}`
    return new CustomError(msg, 404)
}
const duplicateErrorHadler = (err)=>{
    const msg = `There is already a movie with name ${err.keyValue.Name}, Please use another name`
    return new CustomError(msg, 404)
}

const validateErrorHandler = (err)=>{
   const error = Object.values(err.errors).map(val => val.message);
    
   console.log(error)

   const errorMessage = error.join('. ')

   console.log(errorMessage)

   const msg = `Invalid input: ${errorMessage}`

   return new CustomError(msg, 404)
}
module.exports= (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    console.log(error.statusCode)
    error.status = error.status || 404;

    if(process.env.NODE_ENV === 'development'){
        
        devErrors(res, error)
    }else if(process.env.NODE_ENV==='production'){
        console.log(error.name)
        if(error.code === 11000) error = duplicateErrorHadler(error)
        
        if(error.name === 'CastError') error =  castErrorHandler(error)

        if(error.name === 'ValidatorError') error =  validateErrorHandler(error)

        prodErrors(res, error)
    }
}