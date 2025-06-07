import { BadRequestException } from "./exceptions";
import { UserDTO } from "./service";

export function parseId(path: string) {
	const id = path.split("/")[2];

	if (!id) throw new BadRequestException("ID not defined");

	const parsed = Number(id);

	if (isNaN(parsed)) throw new BadRequestException("ID not valid");

	return parsed;
}

export function validateBody(body: unknown) {
	if (typeof body === "object" && body !== null) {
		if (!hasProperty(body, "firstname"))
			throw new BadRequestException("firstname is required");
		if (!hasProperty(body, "lastname"))
			throw new BadRequestException("lastname is required");
		if (!hasProperty(body, "email"))
			throw new BadRequestException("email is required");

		if ("email" in body) {
			validateEmail(body.email as string);
		}
	} else {
		throw new BadRequestException("Invalid body");
	}

	return body as UserDTO;
}

export function validateEmail(email: string) {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!emailRegex.test(email)) {
		throw new BadRequestException("Invalid email format");
	}
}

export function hasProperty(obj: object, prop: string) {
	return Object.prototype.hasOwnProperty.call(obj, prop);
}
