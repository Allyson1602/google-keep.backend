import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

export class CreateListingDto {
  @IsNumber()
  user: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsArray()
  tasks: CreateTaskDto[];
}
