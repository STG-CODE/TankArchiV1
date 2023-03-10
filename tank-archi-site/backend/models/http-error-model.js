//we create this model for custom error massage and code
class HttpError extends Error {
    
    constructor(message,errorCode){
        super(message);//error message
        this.code = errorCode;//error code
    }

}

module.exports = HttpError;