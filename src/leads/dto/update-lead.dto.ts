import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateLeadDto } from './create-lead.dto';
import { LeadStatus } from '@prisma/client';

// The UpdateLeadDto makes all fields from CreateLeadDto optional.
// It also adds fields specific to updating, like status and internal notes.
export class UpdateLeadDto extends PartialType(CreateLeadDto) {
  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}