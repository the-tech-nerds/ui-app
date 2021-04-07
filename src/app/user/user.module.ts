import { Module } from "@nestjs/common";
import {GatewayModule} from "@the-tech-nerds/common-services";
import {AddressController} from "./controllers/address.controller";
import {AddressService} from "./services/address.service";
import {UserController} from "./controllers/user.controller";
import {UserService} from "./services/user.service";
@Module({
    imports: [GatewayModule],
    providers: [
        AddressService,
        UserService
    ],
    controllers: [
        AddressController,
        UserController
    ],
})
export class UserModule {}
