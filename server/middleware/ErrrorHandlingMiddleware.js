module.exports = function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    let statusCode = err.status || 500;

    if (err.name === 'MongoError') {
        if (err.code === 11000) { 
            statusCode = 400; 
            return res.status(statusCode).json({
                message: 'Duplicate key error',
                errors: [{ message: 'This value already exists.' }]
            });
        }
    }

    if (err.name === 'ValidationError') {
        statusCode = 400; 
        return res.status(statusCode).json({
            message: 'Validation Error',
            errors: Object.values(err.errors).map(error => ({ message: error.message }))
        });
    }

    res.status(statusCode).json({
        message: err.message,
        errors: err.errors || []
    });
};
