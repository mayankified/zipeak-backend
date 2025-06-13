import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PropertiesService } from './properties.service';
import { PropertyFilterDto } from './dto/property-filter.dto';


@Controller('properties')
export class PropertiesController {
    constructor(private readonly service: PropertiesService) {}

  @Post()
  create(@Body() dto: CreatePropertyDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePropertyDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
  @Get('search')
search(@Query() filter: PropertyFilterDto) {
  return this.service.searchProperties(filter);
}
}
