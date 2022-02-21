import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class EditTaskStatusDto {
	@IsEnum(TaskStatus)
	status: TaskStatus;
}
