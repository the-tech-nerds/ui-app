import {Injectable} from "@nestjs/common";
import {GatewayService} from "@the-tech-nerds/common-services";

@Injectable()
export class SocialLoginService {
    constructor( private readonly gatewayService: GatewayService) {}
    async login(user: any) {
        const loginInfo = await this.gatewayService.execute('auth', {
            path: '/api/v1/authentication/login/gmail',
            body: {...user},
            method: 'POST'
        })
        return loginInfo
       }
       async loginByFacebook(user: any) {
            const loginInfo = await this.gatewayService.execute('auth',{
                path: '/api/v1/authentication/login/facebook',
                body: {...user},
                method: 'POST'
            })
            return loginInfo
        }
}
