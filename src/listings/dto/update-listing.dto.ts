import { PartialType } from '@nestjs/mapped-types';
import { CreateListingDto } from './create-listing.dto';
import { PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class UpdateListingDto extends PartialType(CreateListingDto) {
  @PrimaryGeneratedColumn()
  id: number;
}
