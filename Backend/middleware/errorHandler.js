import HttpError from "../Utils/httpError";

const errorHandler = (err, req, res, next) => { 
    console.log(err); 

    if(err instanceof HttpError) {
        return res.status(err.errorCode).json({ message: err.message});
    }
};

export default errorHandler;