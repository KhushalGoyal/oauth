export class EJSRenderer<F> {
    form: F;
    validationErrors: Array<any>;
    backendErrors: any;
    showSignup: boolean;
    successMessage?: string;
    failureMessage?: string;
    constructor() {
        this.validationErrors = null;
        this.backendErrors = null;
        this.showSignup = false;
    }
}
