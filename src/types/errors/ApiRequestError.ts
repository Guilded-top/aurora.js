export default class ApiRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ApiRequestError";
    }
}