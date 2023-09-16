import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Request } from 'express';
import { Public } from 'src/auth/constants';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Req() request: Request, @Body() createListingDto: CreateListingDto) {
    return this.listingsService.create(request, createListingDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findAll(@Param('id', ParseIntPipe) id: number) {
    return this.listingsService.findAll(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateListingDto: UpdateListingDto,
  ) {
    return this.listingsService.update(+id, updateListingDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.listingsService.remove(+id);
  }
}
