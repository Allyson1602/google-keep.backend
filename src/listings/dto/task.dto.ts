import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CreateListingDto } from './create-listing.dto';

@Entity()
export class TaskDto {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => CreateListingDto, (listing) => listing.tasks)
  listing_id: CreateListingDto;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ default: false })
  done: boolean;
}
