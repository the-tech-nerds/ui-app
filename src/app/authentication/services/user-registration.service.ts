import { GatewayService } from "@the-tech-nerds/common-services";
import { UserRegistrationRequest } from "../requests/user-registration.request";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRegistrationService {
  constructor(private readonly gatewayService: GatewayService) { }

  async register(userData: UserRegistrationRequest) {
    userData.is_email_verified = userData.email ? true : false;
    userData.is_mobile_verified = userData.phone ? true : false;
    if (userData.is_email_verified) {
      userData.phone = null;
    }
    if (userData.is_mobile_verified) {
      userData.email = null;
    }
    const data = await this.gatewayService.execute('auth', {
      path: '/api/v1/authentication/register/user',
      body: { ...userData },
      method: 'POST'
    })
    return data
  }
}
