class ErrorResponse extends Error{
    constructor(massage,statusCode)
    {
        super(massage);
        this.statusCode = statusCode;
    }
}
module.exports = ErrorResponse;