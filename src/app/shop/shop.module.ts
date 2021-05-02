import { Module } from "@nestjs/common";
import {GatewayModule} from "@the-tech-nerds/common-services";
import { ShopService } from "./services/shop.service";
import { ShopController } from "./controllers/shop.controller";
@Module({
    imports: [GatewayModule],
    providers: [
        ShopService
    ],
    controllers: [
        ShopController
    ],
})
export class ShopModule {}
