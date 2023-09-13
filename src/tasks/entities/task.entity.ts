import { Listing } from 'src/listings/entities/listing.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Listing, (listing) => listing.tasks)
  listing_id: number;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ default: false })
  done: boolean;
}
