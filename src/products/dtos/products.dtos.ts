import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId,
  IsArray,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from './category.dtos';
import { CreateSubDocDto } from './sub-doc.dto';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested()
  readonly category: CreateCategoryDto;

  @IsNotEmpty()
  @IsMongoId()
  readonly brand: string;

  @IsNotEmpty()
  @ValidateNested()
  readonly subDoc: CreateSubDocDto; // 👈 1:1

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubDocDto)
  readonly subDocs: CreateSubDocDto[]; // 👈 1:N
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly limit: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(0)
  readonly offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @IsPositive()
  @ValidateIf((params) => params.minPrice)
  maxPrice: number;
}
