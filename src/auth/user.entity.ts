import { Exclude } from 'class-transformer';
import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	username: string;

	@Exclude({ toPlainOnly: true })
	@Column()
	password: string;

	@OneToMany((_type) => Task, (task) => task.user, { eager: true })
	tasks: Task[];
}
