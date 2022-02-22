import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { EditTaskStatusDto } from './dto/edit-task-status.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TasksRepository)
		private tasksRepository: TasksRepository
	) {}

	async getTaskById(taskId: string): Promise<Task> {
		const found = await this.tasksRepository.findOne({ id: taskId });
		if (!found)
			throw new NotFoundException(`Task with ID ${taskId} not found.`);
		return found;
	}

	async createTask(CreateTaskDto: createTaskDto, user: User): Promise<Task> {
		const { title, description } = CreateTaskDto;
		const task: Task = {
			id: uuid(),
			title,
			description,
			status: TaskStatus.OPEN,
			user,
		};
		return await this.tasksRepository.save(task);
	}

	async getTasks(taskFilter?: getTasksFilterDto): Promise<Task[]> {
		const query = this.tasksRepository.createQueryBuilder('task');
		const { status, search } = taskFilter;
		if (status) {
			query.andWhere('task.status = :status', { status });
		}
		if (search) {
			query.andWhere(
				'LOWER(task.description) LIKE :search OR LOWER(task.title) like :search',
				{ search: `%${search.toLowerCase()}%` }
			);
		}
		return await query.getMany();
	}

	async deleteTaskById(taskId: string): Promise<Task> {
		const task = await this.tasksRepository.findOne({ id: taskId });
		if (!task) {
			throw new NotFoundException(`Task with ID ${taskId} not found.`);
		}
		await this.tasksRepository.delete(task);
		return task;
	}

	async editTask(id: string, editTask: EditTaskStatusDto): Promise<Task> {
		const task = await this.tasksRepository.findOne({ id });
		if (!task) {
			throw new NotFoundException(`Task with ID ${id} not found.`);
		}
		const updatedFields = Object.keys(editTask);
		updatedFields.every((field) => {
			task[field] = editTask[field];
		});
		return await this.tasksRepository.save(task);
	}
}
