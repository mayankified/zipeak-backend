import {
  IsOptional,
  IsString,
  IsEnum,
  IsArray,
  IsNumber,
  IsInt,
  ArrayNotEmpty,
  Min,
  ValidateIf
} from 'class-validator';
import { PropertyType, FurnishingStatus, AvailabilityStatus, Facing } from '@prisma/client';

export class PropertyFilterDto {
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsArray()
  @IsEnum(PropertyType, { each: true })
  propertyType?: PropertyType[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  bhk?: number[];

  @IsOptional()
  @IsArray()
  @IsEnum(FurnishingStatus, { each: true })
  furnishing?: FurnishingStatus[];

  @IsOptional()
  @IsArray()
  @IsEnum(AvailabilityStatus, { each: true })
  availability?: AvailabilityStatus[];

  @IsOptional()
  @IsNumber()
  minCarpetArea?: number;

  @IsOptional()
  @IsNumber()
  maxCarpetArea?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @IsOptional()
  @IsArray()
  @IsEnum(Facing, { each: true })
  facing?: Facing[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  floorRange?: [number, number];

  @IsOptional()
  @IsInt()
  ageOfProperty?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  postedBy?: string[];

  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @IsEnum(['buy', 'rent'], { message: 'searchMode must be either buy or rent' })
  searchMode?: 'buy' | 'rent';
}
