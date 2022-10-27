import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarEntity } from './entities/car.entity';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('cars')
@ApiTags('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CarEntity})
  async create(@Body() createCarDto: CreateCarDto) {
    return new CarEntity(
      await this.carsService.create(createCarDto),
    );
  }
    
  @Get()
  @ApiOkResponse({ type: CarEntity, isArray: true })
  async findAll() {
    const cars = await this.carsService.findAll();
    return cars.map((car) => new CarEntity(car));
  }

  @Get(':id')
  @ApiOkResponse({ type: CarEntity})
  async findOne(@Param('id') id: string) {
    return new CarEntity(await this.carsService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CarEntity})
  async update(
    @Param('id') id: string, 
    @Body() updateCarDto: UpdateCarDto) {
    return new CarEntity(
      await this.carsService.update(id, updateCarDto)
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CarEntity})
  async remove(@Param('id') id: string) {
    return new CarEntity(
      await this.carsService.remove(id)
    );
  }
}
