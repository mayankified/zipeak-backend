import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import { PropertyFilterDto } from './dto/property-filter.dto';
import { Prisma } from '@prisma/client';


@Injectable()
export class PropertiesService {
     constructor(private prisma: PrismaService) {}

  create(data: CreatePropertyDto) {
    return this.prisma.property.create({ data });
  }

  findAll() {
    return this.prisma.property.findMany();
  }

  findOne(id: string) {
    return this.prisma.property.findUnique({ where: { id } });
  }

  update(id: string, data: UpdatePropertyDto) {
    return this.prisma.property.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.property.delete({ where: { id } });
  }

  async searchProperties(filter: PropertyFilterDto) {
    const {
      searchTerm,
      location,
      minPrice,
      maxPrice,
      propertyType,
      bhk,
      furnishing,
      availability,
      minCarpetArea,
      maxCarpetArea,
      amenities,
      facing,
      floorRange,
      ageOfProperty,
    } = filter;

    const filters: Prisma.PropertyWhereInput[] = [];

if (searchTerm) {
  filters.push({
    OR: [
      { title: { contains: searchTerm, mode: 'insensitive' } },
      { description: { contains: searchTerm, mode: 'insensitive' } },
      { area: { contains: searchTerm, mode: 'insensitive' } },
      { city: { contains: searchTerm, mode: 'insensitive' } },
    ],
  });
}

if (location) filters.push({ city: { contains: location, mode: 'insensitive' } });
if (minPrice) filters.push({ price: { gte: minPrice } });
if (maxPrice) filters.push({ price: { lte: maxPrice } });
if (propertyType?.length) filters.push({ propertyType: { in: propertyType } });
if (bhk?.length) filters.push({ bhk: { in: bhk } });
if (furnishing?.length) filters.push({ furnishing: { in: furnishing as any } });
if (availability?.length) filters.push({ availability: { in: availability as any } });
if (minCarpetArea) filters.push({ carpetArea: { gte: minCarpetArea } });
if (maxCarpetArea) filters.push({ carpetArea: { lte: maxCarpetArea } });
if (amenities?.length) filters.push({ amenities: { hasSome: amenities } });
if (facing?.length) filters.push({ facing: { in: facing as any } });
if (floorRange) {
  filters.push({
    AND: [
      { floorNumber: { gte: floorRange[0] } },
      { floorNumber: { lte: floorRange[1] } },
    ],
  });
}
if (ageOfProperty) filters.push({ ageOfProperty: { lte: ageOfProperty } });

// Construct where clause only if filters exist
const where: Prisma.PropertyWhereInput = filters.length ? { AND: filters } : {};


    return this.prisma.property.findMany({ where });
  }
}
