import { GatewayService } from "@the-tech-nerds/common-services";
import {Injectable} from "@nestjs/common";
import { ForgetPasswordCompleteRequest } from "../requests/ForgetPasswordCompleteRequest";

@Injectable()
export class UserForgotPasswordService {
    constructor( private readonly gatewayService: GatewayService) {}
    async createPassword(forgetPasswordCompleteRequest: ForgetPasswordCompleteRequest) {
        const userInfo = await this.gatewayService.execute('auth',{
            path: '/api/v1/password/recover/complete',
            body: {...forgetPasswordCompleteRequest},
            method: 'POST',
            qs:{
                userType: '2'
            },
        })
        return userInfo
    }
   
}