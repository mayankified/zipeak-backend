import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class LeadsService {

     constructor(private prisma: PrismaService) {}

  // CREATE a new lead and connect it to properties
  async create(createLeadDto: CreateLeadDto) {
    const { propertyIds, ...leadData } = createLeadDto;

    // Check if all provided property IDs exist
    const properties = await this.prisma.property.findMany({
      where: { id: { in: propertyIds } },
    });
    if (properties.length !== propertyIds.length) {
      throw new NotFoundException('One or more properties not found.');
    }

    return this.prisma.lead.create({
      data: {
        ...leadData,
        properties: {
          connect: propertyIds.map((id) => ({ id })),
        },
      },
    });
  }

  // READ all leads (with pagination)
  findAll(page: number, limit: number) {
    return this.prisma.lead.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        properties: {
          select: { id: true, title: true }, // Include basic info of interested properties
        },
      },
    });
  }

  // READ a single lead by its ID
  async findOne(id: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
      include: {
        properties: true, // Include full details of interested properties
      },
    });

    if (!lead) {
      throw new NotFoundException(`Lead with ID "${id}" not found`);
    }
    return lead;
  }

  // UPDATE a lead's details
  async update(id: string, updateLeadDto: UpdateLeadDto) {
    const { propertyIds, ...leadData } = updateLeadDto;

    // First check if the lead exists
    await this.findOne(id);
    
    return this.prisma.lead.update({
      where: { id },
      data: {
        ...leadData,
        // If propertyIds are provided, update the connections
        ...(propertyIds && {
          properties: {
            set: propertyIds.map((id) => ({ id })),
          },
        }),
      },
    });
  }

  // DELETE a lead
  async remove(id: string) {
    await this.findOne(id); // Check for existence
    await this.prisma.lead.delete({ where: { id } });
    return { message: `Lead with ID "${id}" successfully deleted.` };
  }
}
