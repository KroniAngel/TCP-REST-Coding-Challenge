import { BadRequestException, NotFoundException } from "./exceptions";

export interface User {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
}

export interface UserDTO {
	firstname: string;
	lastname: string;
	email: string;
}

export class UserService {
	private db: User[] = []; 
	private count = 1;

	constructor() {}

	public list() {
		return this.db;
	}

	public create(dto: UserDTO) {
		const emailExist = this.db.some((user) => user.email === dto.email);
		if (emailExist) {
			throw new BadRequestException('Email already registered');
		}

		const newUser: User = {
			id: this.count,
			...dto
		};

		this.db.push(newUser);
		this.count++;
		return newUser;
	}

	public update(id: number, dto: UserDTO) {
		const userIndex = this.db.findIndex((user) => user.id === id);
		if (userIndex === -1) {
			throw new NotFoundException('User not found');
		}

		const emailExist = this.db.some((user) => user.email === dto.email && user.id !== id);
		if (emailExist) {
			throw new BadRequestException('Email already registered');
		}

		const updatedUser: User = {
			id,
			...dto
		};

		this.db[userIndex] = updatedUser;
		return updatedUser;
	}

	public delete(id: number) {
		const userIndex = this.db.findIndex((user) => user.id === id);
		if (userIndex === -1) {
			throw new NotFoundException('User not found');
		}

		const deletedUser = this.db[userIndex];
		this.db.splice(userIndex, 1);
		return deletedUser;
	}
}