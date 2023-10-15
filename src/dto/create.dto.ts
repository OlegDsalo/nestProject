import { Min, IsNumber } from 'class-validator';

export class CreateDto {
  @Min(1)
  @IsNumber()
  num: number;
}
