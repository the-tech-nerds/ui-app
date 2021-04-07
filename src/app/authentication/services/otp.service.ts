import { GatewayService } from "@the-tech-nerds/common-services";
import {Injectable} from "@nestjs/common";
const moment  = require("moment");
import {OtpRequest} from "../requests/otp.request";
import {OtpValidateRequest} from "../requests/otp-validate.request";
@Injectable()
export class OtpService {
    constructor( private readonly gatewayService: GatewayService) {}
    async generateOtp(otpRequest: OtpRequest) {
        let otpInfo = await this.gatewayService.execute('auth',{
            path: '/api/v1/otp/generate',
            body: {...otpRequest},
            method: 'POST'
        })
        const now = moment(new Date()) .format('YYYY-MM-DD HH:mm:ss');
        const diff = moment.duration(moment(otpInfo.data.expire_time).diff(moment(now)));
        otpInfo.data.timeInSeconds = diff.asSeconds();
        return otpInfo
    }
    async validateOtp(otpValidateRequest: OtpValidateRequest) {
        let otpInfo = await this.gatewayService.execute('auth',{
            path: '/api/v1/otp/validate',
            body: {...otpValidateRequest},
            method: 'POST'
        })
        return otpInfo
    }
}
