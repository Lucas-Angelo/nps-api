

export class AppError {

    public readonly message: string;
    public readonly statusCode: number;

    // Erro que chegou
    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }

}