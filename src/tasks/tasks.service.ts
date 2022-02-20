import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(taskId: string): Task {
    return this.tasks.find((t) => t.id === taskId);
  }
  deleteTaskBy(taskId: string) {
    const i = this.tasks.findIndex((t) => t.id === taskId);
    if (!(i === -1)) return this.tasks.splice(i, 1)[0];
  }

  createTask(CreateTaskDto: createTaskDto): Task {
    const { title, description } = CreateTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  // editTask(
  //   id: string,
  //   title: string,
  //   description: string,
  //   status: TaskStatus
  // ): Task {
  //   const task = this.tasks.find((t) => t.id === id);
  //   if (!task) throw new Error('Task not found');
  // }
}
