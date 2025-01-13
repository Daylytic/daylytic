export class RequestError extends Error {
    status: number;
    
    constructor(message: string, status: number) {
        super(message); // Call the constructor of the base class `Error`
        this.name = "RequestError"; // Set the error name to your custom error class name
        this.status = status;
        Object.setPrototypeOf(this, RequestError.prototype);
    }
}