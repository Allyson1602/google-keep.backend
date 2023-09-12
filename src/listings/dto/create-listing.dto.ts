import { Column, Entity, OneToMany } from 'typeorm';
import { TaskDto } from './task.dto';

@Entity()
export class CreateListingDto {
  @Column({ type: 'varchar', length: 60 })
  title: string;

  @OneToMany(() => TaskDto, (task) => task.listing_id)
  tasks: TaskDto[];
}
