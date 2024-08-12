class CustomError extends Error{
    constructor(message, statusCode){
        super(message)

        this.message = message;
        this.statusCode = statusCode >= 400 && statusCode < 500 ? 404 : 404;

        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = CustomError;