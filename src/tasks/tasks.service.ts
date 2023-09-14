import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(listingId: number): Promise<Task[]> {
    const tasks = await this.taskRepository
      .createQueryBuilder('task')
      .where({ listing_id: listingId })
      .leftJoinAndSelect('task.listing_id', 'listing_id')
      .getMany();

    return tasks;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, listing_id: updateTaskDto.listing_id },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    task.description = updateTaskDto.description;
    task.done = updateTaskDto.done;
    task.listing_id = updateTaskDto.listing_id;

    const result = await this.taskRepository.update(id, task);

    if (result.affected < 1) {
      throw new NotFoundException('Tarefa não atualizada');
    }

    return task;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.taskRepository.delete(id);

    if (result.affected < 1) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return result.affected >= 1 ? true : false;
  }
}
