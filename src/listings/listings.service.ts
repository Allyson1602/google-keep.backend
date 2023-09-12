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

    // const tasks = await createListingDto.tasks.map((task) => {
    //   return this.taskRepository.save({
    //     ...task,
    //     listing_id: newListing.id,
    //   });
    // });

    // console.log(tasks);
    // newListing.tasks = tasks;
    console.log(await this.tasksService.findAll());
    return newListing;
  }

  async findAll(): Promise<Listing[]> {
    return await this.listingRepository.find();
    // return this.listingRepository.find({ where: { user: { id: userId }} });
  }

  async update(id: number, updateListingDto: UpdateListingDto) {
    const listing = await this.listingRepository.findOne({
      where: { id },
    });

    if (!listing) {
      throw new NotFoundException('Checklist não encontrada');
    }

    listing.title = updateListingDto.title;

    const tasks: Task[] = updateListingDto.tasks.map((task) => ({
      ...task,
      listing_id: listing.id,
    }));

    listing.tasks = tasks;

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
