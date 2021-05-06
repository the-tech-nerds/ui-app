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

    @Get('/product/search/:shop/:q')
    async getProductItemsBySearchParam(
        @Param('q') query: string,
        @Param('shop') shopId: string,
    ) {
        return this.productService.getProductsBySearchParam(query, shopId);
    }

    @Get('product-details/:slug')
    async getProductDetailsBySlug(
        @Param('slug') slug: string
    ) {
        const product = await this.productService.getProductBySlug(slug);
        return {
            product,
        };
    }
    
    @Get('product/:slug')
    @Render('product/[product]')
    async getProductBySlug(
        @Param('slug') slug: string
    ) {
        const product = await this.productService.getProductBySlug(slug);
        return {
            productDetails: product,
            slug,
        };
    }
}
