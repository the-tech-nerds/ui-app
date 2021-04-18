import { Module } from "@nestjs/common";
import { GatewayModule } from "@the-tech-nerds/common-services";
import { WishlistController } from "./wishlist.controller";
import { WishlistService } from "./wishlist.service";
@Module({
    imports: [GatewayModule],
    providers: [
        WishlistService
    ],
    controllers: [
        WishlistController
    ],
})
export class WishlistModule { }