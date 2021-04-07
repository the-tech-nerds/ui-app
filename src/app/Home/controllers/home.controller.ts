import {Controller, Get, Render, Req} from '@nestjs/common';

@Controller()
export class HomeController {
    constructor() {}

    // @Get('/')
    // @Render('pages/home')
    // notFound(@Req() req: any) {
    //     return {};
    // }
}
