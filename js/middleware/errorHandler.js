"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_1 = require("../response");
/**
 * Error Handling Middleware - It is responsible to sent all type of errors and log them in database
 * @param error - error
 * @param request - request payload
 * @param response - resposne
 * @param next - next middleware
 */
function errorHandler(error, request, response, next) {
    const statusCode = error.statusCode ? error.statusCode : response_1.StatusCodes.INTERNAL_SERVER_ERROR;
    console.error("Loggin Error: ", error);
    // errorLogger(err, request.originalUrl);
    response.status(statusCode).send(new response_1.ErrorResponse(error.message, error.errorCode));
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map