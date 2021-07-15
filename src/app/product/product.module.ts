import {Module} from "@nestjs/common";
import {GatewayModule} from "@the-tech-nerds/common-services";
import {ProductController} from "./controllers/product.controller";
import {ProductService} from "./services/product.service";
import {OfferController} from "./controllers/offer.controller";
import {OfferService} from "./services/offer.service";

@Module({
    imports: [GatewayModule],
    providers: [
        ProductService,
        OfferService
    ],
    controllers: [
        ProductController,
        OfferController
    ],
})
export class ProductModule {
}
