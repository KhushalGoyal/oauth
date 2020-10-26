"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppException = void 0;
class AppException extends Error {
    constructor(statusCode, message, errorCode, serviceType) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.statusCode = statusCode;
        this.message = message;
        if (errorCode)
            this.errorCode = errorCode;
        if (serviceType)
            this.serviceType = serviceType;
    }
    static create(statusCode, message, errorCode, serviceType) {
        throw new AppException(statusCode, message, errorCode, serviceType);
    }
}
exports.AppException = AppException;
//# sourceMappingURL=exception.js.map