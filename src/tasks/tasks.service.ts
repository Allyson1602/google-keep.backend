import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task: Task = new Task();

    task.id = createTaskDto.id;
    task.listing_id = createTaskDto.listing_id;
    task.description = createTaskDto.description;
    task.done = createTaskDto.done;

    return await this.taskRepository.save(task);
  }

  async createTasks(createTaskDto: CreateTaskDto[]): Promise<Task[]> {
    const newTasks = createTaskDto.map(async (taskDto) => {
      const task: Task = new Task();

      task.id = taskDto.id;
      task.listing_id = taskDto.listing_id;
      task.description = taskDto.description;
      task.done = taskDto.done;

      return await this.taskRepository.save(task);
    });

    return await Promise.all(newTasks);
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
