
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsArray,
  IsDateString,
  IsInt,
  Min,
  IsPositive,
  IsBoolean,
} from 'class-validator';
import { AvailabilityStatus, Facing, FurnishingStatus, PropertyType } from '@prisma/client';

// This DTO defines the shape of the data that the client must send
// to create a new property. The validation decorators ensure data integrity.
export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  pricePerSqFt: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  area: string;

  @IsString()
  @IsNotEmpty()
  fullAddress: string;

  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsInt()
  @Min(1)
  bhk: number;

  @IsInt()
  @Min(1)
  bathrooms: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  balconies?: number;

  @IsNumber()
  @IsPositive()
  superBuiltUpArea: number;

  @IsNumber()
  @IsPositive()
  carpetArea: number;

  @IsEnum(FurnishingStatus)
  furnishing: FurnishingStatus;

  @IsOptional()
  @IsInt()
  floorNumber?: number;

  @IsOptional()
  @IsInt()
  totalFloors?: number;

  @IsOptional()
  @IsEnum(Facing)
  facing?: Facing;

  @IsOptional()
  @IsNumber()
  @Min(0)
  ageOfProperty?: number;

  @IsEnum(AvailabilityStatus)
  availability: AvailabilityStatus;

  @IsOptional()
  @IsDateString()
  expectedPossession?: string;

  @IsArray()
  @IsString({ each: true })
  amenities: string[];

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsOptional()
  @IsBoolean()
  published?: boolean = false;
}