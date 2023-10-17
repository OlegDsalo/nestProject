import { IsString } from 'class-validator';

export class Coffee {
  @IsString()
  name: string;
  @IsString()
  brand: string;
  @IsString({ each: true })
  flavors: string[];
}
