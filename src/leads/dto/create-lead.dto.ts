import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

// This DTO validates the incoming data for creating a new lead.
export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  message?: string;

  // Expects an array of property IDs (cuid strings) that the lead is interested in.
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  propertyIds: string[];
}