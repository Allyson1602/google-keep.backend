import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

export class CreateListingDto {
  title: string;

  tasks: CreateTaskDto[];
}
