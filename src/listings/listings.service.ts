import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(UsersService)
    private readonly userService: UsersService,
    @Inject(TasksService)
    private readonly tasksService: TasksService,
  ) {}

  async create(
    request: Request,
    createListingDto: CreateListingDto,
  ): Promise<Listing | (Listing & { key?: string })> {
    const listing: Listing & { key?: string } = new Listing();
    listing.title = createListingDto.title;

    const newListing = await this.listingRepository.save(listing);

    const newTasks: Promise<Task>[] = createListingDto.tasks.map(
      async (taskDto) => {
        const task: Task = new Task();

        task.id = taskDto.id;
        task.listing_id = newListing.id;
        task.description = taskDto.description;
        task.done = taskDto.done;

        return await this.tasksService.create(task);
      },
    );

    newListing.tasks = await Promise.all(newTasks);

    const AuthToken = request.headers.authorization;
    if (!AuthToken) {
      const user = await this.userService.create();
      const authUser = await this.authService.signIn(user.id);

      newListing.key = authUser.key;
    }

    return newListing;
  }

  async findAll(): Promise<Listing[]> {
    const listings = await this.listingRepository
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.tasks', 'listing_id')
      .getMany();

    return listings;
  }

  async findOne(id: number): Promise<Listing> {
    return await this.listingRepository.findOne({ where: { id } });
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

    const result = await this.listingRepository.update(id, listing);

    if (result.affected < 1) {
      throw new NotFoundException('Checklist não atualizada');
    }

    const tasks = await this.tasksService.findAll(id);

    if (!tasks) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    listing.tasks = tasks;

    return listing;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.listingRepository.delete(id);

    if (result.affected < 1) {
      throw new NotFoundException('Checklist não encontrada');
    }

    return result.affected >= 1 ? true : false;
  }
}
