import { Controller, Get, Param, Render } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
    constructor(private productService: ProductService) {
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
