import { Controller, Get, Query, Render, Param, NotFoundException } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
  ) {}

  @Render('home')
  @Get('/')
  public index(@Query('name') name?: string) {
    return { name };
  }
}
