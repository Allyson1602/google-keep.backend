import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNumber()
  listing: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsBoolean()
  done: boolean;
}
