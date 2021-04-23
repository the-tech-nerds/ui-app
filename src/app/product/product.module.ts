import {Module} from "@nestjs/common";
import {GatewayModule} from "@the-tech-nerds/common-services";
import {ProductController} from "./controllers/product.controller";
import {ProductService} from "./services/product.service";

@Module({
    imports: [GatewayModule],
    providers: [
        ProductService
    ],
    controllers: [
        ProductController
    ],
})
export class ProductModule {
}
