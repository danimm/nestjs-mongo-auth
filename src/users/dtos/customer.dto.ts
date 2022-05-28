import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class Skills {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  color: string;
}

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @ValidateNested()
  @Type(() => Skills)
  readonly skills: Skills[];
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
