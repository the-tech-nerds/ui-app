import { Module } from "@nestjs/common";
import { GatewayModule } from "@the-tech-nerds/common-services";
import { CategoryController } from "./controllers/category.controller";
import { CategoryService } from "./services/category.service";
@Module({
    imports: [GatewayModule],
    providers: [
        CategoryService
    ],
    controllers: [
        CategoryController
    ],
})
export class CategoryModule { }
