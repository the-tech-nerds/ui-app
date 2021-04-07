import { GatewayService } from "@the-tech-nerds/common-services";
import {Injectable} from "@nestjs/common";
import {UserLoginRequest} from "../requests/user-login.request";

@Injectable()
export class UserLoginService {
    constructor( private readonly gatewayService: GatewayService) {}
    async login(userLoginRequest: UserLoginRequest) {
        const loginInfo = await this.gatewayService.execute('auth',{
            path: '/api/v1/authentication/login/user',
            body: {...userLoginRequest, type:2},
            method: 'POST'
        })
        return loginInfo
    }
}
