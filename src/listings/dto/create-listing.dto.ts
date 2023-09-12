import { TaskDto } from './task.dto';

export class CreateListingDto {
  id: number;
  title: string;
  tasks: TaskDto[];
}
