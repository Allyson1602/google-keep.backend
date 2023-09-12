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
    const listing: Listing = new Listing();
    listing.title = createListingDto.title;

    const tasks: Task[] = createListingDto.tasks.map((task) => ({
      ...task,
      listing: listing,
    }));

    listing.tasks = tasks;

    return this.listingRepository.save(listing);
  }

  findAll() {
    return `This action returns all listings`;
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
      listing: listing,
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
