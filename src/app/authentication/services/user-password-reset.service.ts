import { GatewayService } from "@the-tech-nerds/common-services";
import {Injectable} from "@nestjs/common";
import {UserResetPasswordRequest} from "../requests/reset-password.request";
import {CreatePasswordRequest} from "../requests/create-password.request";

@Injectable()
export class UserPasswordResetService {
    constructor( private readonly gatewayService: GatewayService) {}
    async changePassword(userResetPasswordRequest: UserResetPasswordRequest) {
        const userInfo = await this.gatewayService.execute('auth',{
            path: '/api/v1/password/reset',
            body: {...userResetPasswordRequest},
            method: 'POST'
        })
        return userInfo
    }
    async createPassword(request: CreatePasswordRequest) {
        const res = await this.gatewayService.execute('auth',{
            path: '/api/v1/password/create',
            body: {...request},
            method: 'POST'
        })
        return res
    }
}
