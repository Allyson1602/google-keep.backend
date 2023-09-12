import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: number, updateListingDto: UpdateListingDto) {
    const updateListing = await this.listingRepository.findOne({
      where: { id },
    });

    if (!updateListing) {
      throw new NotFoundException('Checklist não encontrada');
    }

    updateListing.title = updateListingDto.title;

    const tasks: Task[] = updateListingDto.tasks.map((task) => ({
      ...task,
      listing: updateListing,
    }));

    updateListing.tasks = tasks;

    return await this.listingRepository.save(updateListing);
  }

  remove(id: number) {
    return `This action removes a #${id} listing`;
  }
}
