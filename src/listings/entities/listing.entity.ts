import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class Listing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60 })
  title: string;

  @OneToMany(() => Task, (task) => task.listing_id)
  tasks: Task[];
}
