import { TaskDto } from './task.dto';

export class CreateListingDto {
  title: string;
  tasks: TaskDto[];
}
