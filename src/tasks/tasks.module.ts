import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
	controllers: [TasksController],
	providers: [TasksService],
	imports: [TypeOrmModule.forFeature([TasksRepository])],
})
export class TasksModule {}
