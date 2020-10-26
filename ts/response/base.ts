class BaseResponse {
    public success: boolean;

    public message: any;

    protected constructor(success: boolean) {
        this.success = success;
    }

    protected setMessage(message: any): void {
        if (message) this.message = message;
    }
}

export class SuccessResponse extends BaseResponse {
    constructor(message? : any) {
        super(true);
        this.setMessage(message);
    }
}

export class ErrorResponse extends BaseResponse {
    private errorCode: string;
    constructor(message: any, errorCode?: string) {
        super(false);
        this.errorCode = errorCode;
        this.setMessage(message);
    }
}