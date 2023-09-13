import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    @Inject(TasksService)
    private readonly tasksService: TasksService,
  ) {}

  async create(createListingDto: CreateListingDto): Promise<Listing> {
    const listing: Listing = new Listing();
    listing.title = createListingDto.title;

    const newListing = await this.listingRepository.save(listing);

    const newTasks: Promise<Task>[] = createListingDto.tasks.map(
      async (taskDto) => {
        const task: Task = new Task();

        task.id = taskDto.id;
        task.listing_id = taskDto.listing_id;
        task.description = taskDto.description;
        task.done = taskDto.done;

        return await this.tasksService.create(task);
      },
    );

    newListing.tasks = await Promise.all(newTasks);

    return newListing;
  }

  async findAll(): Promise<Listing[]> {
    return await this.listingRepository.find();
    // return this.listingRepository.find({ where: { user: { id: userId }} });
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(
    id: number,
    updateListingDto: UpdateListingDto,
  ): Promise<Listing> {
    const listing = await this.listingRepository.findOne({
      where: { id },
    });

    if (!listing) {
      throw new NotFoundException('Checklist não encontrada');
    }

    listing.title = updateListingDto.title;

    const tasks: Promise<Task>[] = updateListingDto.tasks.map(
      async (taskDto) => {
        const task: Task = new Task();

        task.id = taskDto.id;
        task.listing_id = taskDto.listing_id;
        task.description = taskDto.description;
        task.done = taskDto.done;

        return await this.tasksService.update(task.id, task);
      },
    );

    listing.tasks = await Promise.all(tasks);

    return await this.listingRepository.save(listing);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.listingRepository.delete(id);

    if (result.affected < 1) {
      throw new NotFoundException('Checklist não encontrada');
    }

    return result.affected >= 1 ? true : false;
  }
}
