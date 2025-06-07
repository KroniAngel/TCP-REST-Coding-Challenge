export class BadRequestException extends Error {
	statusCode: number = 400;

	constructor(message: string) {
		super(message);
	}
}

export class NotFoundException extends Error {
	statusCode: number = 404;

	constructor(message: string) {
		super(message);
	}
}