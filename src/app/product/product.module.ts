import {ProductController} from './product.controller';
import {Module} from "@nestjs/common";
import {GatewayModule} from "@the-tech-nerds/common-services";
import {ProductService} from "./product.service";

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
