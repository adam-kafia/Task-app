import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentials } from './dto/auth-creds.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UsersRepository)
		private usersRepository: UsersRepository,
		private jwtService: JwtService
	) {}
	register(createUserDto: AuthCredentials): Promise<void> {
		return this.usersRepository.createUser(createUserDto);
	}
	async signin(
		authCredentials: AuthCredentials
	): Promise<{ accessToken: string }> {
		const { username, password } = authCredentials;
		const user = await this.usersRepository.findUserByUsername(username);
		if (user && (await bcrypt.compare(password, user.password))) {
			const payload: JwtPayload = { username };
			const accessToken: string = await this.jwtService.sign(payload);
			return { accessToken };
		}
		throw new UnauthorizedException(`Please check your logging credentials`);
	}
}
