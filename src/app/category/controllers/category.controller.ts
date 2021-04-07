import { Controller, Get } from '@nestjs/common';

import { CategoryService } from '../services/category.service';

@Controller()
export class CategoryController {
    constructor(private categoryService: CategoryService) {
    }

    @Get('/category/all')
    async index() {
        return this.categoryService.getAll();
    }
}
