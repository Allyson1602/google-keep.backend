import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
  ) {}

  create(createListingDto: CreateListingDto): Promise<Listing> {
    const newListing: Listing = new Listing();
    newListing.title = createListingDto.title;

    const tasks: Task[] = createListingDto.tasks.map((task) => ({
      ...task,
      listing: newListing,
    }));

    newListing.tasks = tasks;

    return this.listingRepository.save(newListing);
  }

  findAll() {
    return `This action returns all listings`;
  }

  update(id: number, updateListingDto: UpdateListingDto) {
    return `This action updates a #${id} listing`;
  }

  remove(id: number) {
    return `This action removes a #${id} listing`;
  }
}
