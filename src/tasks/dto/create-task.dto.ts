import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsInt()
  listing_id: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsBoolean()
  done: boolean;
}
