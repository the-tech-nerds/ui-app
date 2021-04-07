import {Body, Controller, Post} from '@nestjs/common';
import {OtpService} from "../services/otp.service";
import {OtpRequest} from "../requests/otp.request";
import {OtpValidateRequest} from "../requests/otp-validate.request";

@Controller('otp')
export class OtpController {
    constructor(
        private otpService:  OtpService,
    ) {
    }

    @Post('/generate')
    async otpGenerate(@Body() otpRequest: OtpRequest){
       const res = await  this.otpService.generateOtp(otpRequest);
       return res;
    }
    @Post('/validate')
    async validateOtp(@Body() otpValidateRequest: OtpValidateRequest){
        const res = await  this.otpService.validateOtp(otpValidateRequest);
        return res;
    }
}
