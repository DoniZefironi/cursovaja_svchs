class ApiError extends Error{
    constructor(status, message){
        super();
        this.status = status
        this.message = message
    }

    static ok(message){
        return new ApiError(200, message);
    }

    static badRequest(message,errors = []) {
        return new ApiError(400, message);
    }

    static unauthorized(message) {
        return new ApiError(401, message);
    }

    static forbidden(message) {
        return new ApiError(403, message);
    }

    static notFound(message) {
        return new ApiError(404, message);
    }


    static Internal(message) { // Внутренняя ошибка сервера
        return new ApiError(500, message);
    }

}


module.exports = ApiError