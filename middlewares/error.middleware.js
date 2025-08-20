const errorMiddleware = (err, req, res, next) => {
    try {
        let error = {...err};

        error.message = err.message;

        console.error(err);

        //Mongoose bad objectId
        if (err.name === 'CastError'){
            const message = 'Ressource not found';

            error = new Error(message);
            error.statusCode = 404;
        }

        //mongoose duplicate key
        if (err.code === 11000) {
            const message = 'Duplicate field value entered';
            error = new Error(message);
            error.statusCode = 400;
        }

    } catch (error) {
        next(error)
    }
};