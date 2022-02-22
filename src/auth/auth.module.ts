import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
	exports: [JwtStrategy, PassportModule],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: 'area51',
			signOptions: {
				expiresIn: 36000,
			},
		}),
		TypeOrmModule.forFeature([UsersRepository]),
	],
})
export class AuthModule {}
