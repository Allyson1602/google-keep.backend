import { Listing } from 'src/listings/entities/listing.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @ManyToOne(() => Listing, (listing) => listing.tasks, {
    onDelete: 'CASCADE',
  })
  listing: number;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ default: false })
  done: boolean;
}
