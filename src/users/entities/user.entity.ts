import { Listing } from 'src/listings/entities/listing.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Listing, (listing) => listing.user)
  listings: Listing[];
}
