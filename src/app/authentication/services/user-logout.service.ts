import { GatewayService } from "@the-tech-nerds/common-services";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserLogoutService {
    constructor( private readonly gatewayService: GatewayService) {}
    logout() {
        this.gatewayService.execute("auth", {
            method: "GET",
            path: '/api/v1/authentication/logout',
        }).catch(e => {});
    }
}
