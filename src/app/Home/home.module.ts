import { Module } from "@nestjs/common";
import {GatewayModule} from "@the-tech-nerds/common-services";
import {HomeController} from "./controllers/home.controller";
import {HomeService} from "./services/home.service";
@Module({
    imports: [GatewayModule],
    providers: [
        HomeService
    ],
    controllers: [
       HomeController
    ],
})
export class HomeModule {}
