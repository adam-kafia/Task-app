import { ConflictException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentials } from './dto/auth-creds.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
	async createUser(createUserDto: AuthCredentials): Promise<void> {
		const { username, password } = createUserDto;

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = this.create({ username, password: hashedPassword });
		try {
			await this.save(user);
		} catch (error) {
			console.log(error.code);
			if (error.code === '23505') {
				throw new ConflictException(`Username ${username} already exists`);
			}
		}
	}
	async findUserByUsername(username: string): Promise<User> {
		const user = this.findOne({ username });
		if (!user)
			throw new NotFoundException(`User with username ${username} not found`);
		return user;
	}
}
