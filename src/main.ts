import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
	const port = process.env.PORT;
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new TransformInterceptor());
	const config = new DocumentBuilder().setTitle('Task Management App').build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('', app, document);
	await app.listen(port || 3000);
}
bootstrap();
