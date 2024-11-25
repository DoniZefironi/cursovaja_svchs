class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static bodRequest(message ) {
        return new ApiError(484, message)
    }

    static internal(message ) {
        return new ApiError(500, message)
    }

    static forbidden(message ) {
        return new ApiError(483, message)
    }
}

module.exports = ApiError