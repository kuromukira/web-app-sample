export class ServiceReturn {
    readonly success: boolean = false;
    readonly message: string = '';
    readonly data: any = null;
    constructor(success: boolean, message: string, data: any) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}