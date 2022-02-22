import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { createTaskDto } from './dto/create-task.dto';
import { EditTaskStatusDto } from './dto/edit-task-status.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
	constructor(private taskService: TasksService) {}

	@Get('/:id')
	getTaskById(@Param('id') id: string): Promise<Task> {
		return this.taskService.getTaskById(id);
	}

	@Post()
	createTask(
		@Body() createTask: createTaskDto,
		@GetUser() user: User
	): Promise<Task> {
		return this.taskService.createTask(createTask, user);
	}

	@Get()
	getTasks(@Query() filterDto?: getTasksFilterDto): Promise<Task[]> {
		return this.taskService.getTasks(filterDto);
	}

	@Delete('/:id')
	deleteTaskById(@Param('id') id: string): Promise<Task> {
		return this.taskService.deleteTaskById(id);
	}

	@Patch('/:id/status')
	editTaskStatus(
		@Param('id') id: string,
		@Body() status: EditTaskStatusDto
	): Promise<Task> {
		return this.taskService.editTask(id, status);
	}
}
