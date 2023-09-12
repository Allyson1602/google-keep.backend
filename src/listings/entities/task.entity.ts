import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Listing } from './listing.entity';

@Entity()
export class Task {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => Listing, (listing) => listing.tasks)
  listing_id: Listing;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ default: false })
  done: boolean;
}
