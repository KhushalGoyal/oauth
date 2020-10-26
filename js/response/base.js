"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = exports.SuccessResponse = void 0;
class BaseResponse {
    constructor(success) {
        this.success = success;
    }
    setMessage(message) {
        if (message)
            this.message = message;
    }
}
class SuccessResponse extends BaseResponse {
    constructor(message) {
        super(true);
        this.setMessage(message);
    }
}
exports.SuccessResponse = SuccessResponse;
class ErrorResponse extends BaseResponse {
    constructor(message, errorCode) {
        super(false);
        this.errorCode = errorCode;
        this.setMessage(message);
    }
}
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=base.js.map