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

  // @Render('category/[slug]')
  // @Get('/category/:slug')
  // public get(@Param('slug') slug: string) {
  //   console.log('here');
  //   const post = this.service.find(slug);

  //   if (post === null) {
  //     throw new NotFoundException();
  //   }

  //   return { post };
  // }
}
