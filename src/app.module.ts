import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		TasksModule,
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				return {
					type: 'postgres',
					autoLoadEntities: true,
					synchronize: true,
					host: configService.get('DB_HOST'),
					port: configService.get('DB_PORT'),
					username: configService.get('DB_USERNAME'),
					password: configService.get('DB_PASSWORD'),
					database: configService.get('DB_DATABASE'),
				};
			},
		}),
		// TypeOrmModule.forRoot({
		// 	type: 'postgres',
		// 	host:
		// 	autoLoadEntities: true,
		// 	synchronize: true,
		// }),
		AuthModule,
	],
})
export class AppModule {}
