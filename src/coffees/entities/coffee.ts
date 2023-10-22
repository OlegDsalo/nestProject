import { IsString } from "class-validator";
import { FlavorEntity } from "./flavor.entity";

export class Coffee {
  @IsString()
  name: string;
  @IsString()
  brand: string;
  @IsString({ each: true })
  flavors: string[];
}
