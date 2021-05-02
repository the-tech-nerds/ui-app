import { Controller, Get, Param, Render } from '@nestjs/common';

import { CategoryService } from '../services/category.service';

@Controller()
export class CategoryController {
    constructor(private categoryService: CategoryService) {
    }

    @Get('/category/all')
    async index() {
        return this.categoryService.getAll();
    }

    @Get('/:slug')
    @Render('category/[slug]')
    async getProductsByCategorySlug(
        @Param('slug') slug: string
    ) {
        return {
            slug,
        };
    }

    @Get('/category-product/:shop/:slug')
    async getProductItemsByCategorySlug(
        @Param('slug') slug: string,
        @Param('shop') shopId: string,
    ) {
        return this.categoryService.getProductsByCategorySlug(slug, shopId);
    }
}
