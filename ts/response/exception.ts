export class AppException extends Error {
    public statusCode: number;
    public serviceType: string | undefined;
    public errorCode: string | undefined
    constructor(statusCode: number, message: string, errorCode?: string, serviceType?: string) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.statusCode = statusCode;
        this.message = message;
        if(errorCode) this.errorCode = errorCode;
        if(serviceType) this.serviceType = serviceType;
    }

    static create(statusCode: number, message: string, errorCode?: string, serviceType?: string) {
        throw new AppException(statusCode, message, errorCode, serviceType)
    }
}