import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAuthDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
