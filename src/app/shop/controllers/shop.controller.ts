import { Body, Controller, Get, Post, Put, Render, Req } from '@nestjs/common';
import { ShopService } from "../services/shop.service";

@Controller()
export class ShopController {
    constructor(private shopService: ShopService) {
    }

    @Get('/shops/select')
    @Render('shops')
    async list() {
        return this.shopService.getAll();
    }

    @Get('/shops/all')
    // @Render('shops')
    async index() {
        return this.shopService.getAll();
    }
}
