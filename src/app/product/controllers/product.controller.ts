import {Controller, Get, Param, Render} from '@nestjs/common';

import {ProductService} from '../services/product.service';

@Controller()
export class ProductController {
    constructor(private productService: ProductService) {
    }
    @Get('product/search')
    @Render('product/search')
    async getProductItemsBySearchParamView(
        @Param('q') query: string
    ) {
        return {
            query: query
        };
    }

    @Get('/product/search/:q')
    async getProductItemsBySearchParam(
        @Param('q') query: string
    ) {
        return this.productService.getProductsBySearchParam(query);
    }
    @Get('product/:slug')
    @Render('product/[product]')
    async getProductBySlug(
        @Param('slug') slug: string
    ) {
        const product = await this.productService.getProductBySlug(slug);
        return {
            product,
        };
    }
}
