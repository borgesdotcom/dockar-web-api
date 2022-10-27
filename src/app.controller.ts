import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private prisma: PrismaService,
  ) {}

  @Get('cars')
  async getCars() {
    return this.prisma.car.findMany();
  }
}
