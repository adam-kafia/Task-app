import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/auth-creds.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/register')
	register(@Body() createUserDto: AuthCredentials): Promise<void> {
		return this.authService.register(createUserDto);
	}
	@Post('/signin')
	signin(@Body() signinDto: AuthCredentials): Promise<{ accessToken: string }> {
		return this.authService.signin(signinDto);
	}
}
