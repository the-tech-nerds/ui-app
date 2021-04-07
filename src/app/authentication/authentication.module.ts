import { Module } from "@nestjs/common";
import { AuthenticationController } from "./controllers/authentication.controller";
import { ApiResponseService } from "../utils/services/api-response.service";
import { UserRegistrationService } from "./services/user-registration.service";
import {GatewayModule} from "@the-tech-nerds/common-services";
import {UserLoginService} from "./services/user-login.service";
import {UserPasswordResetService} from "./services/user-password-reset.service";
import {UserLogoutService} from "./services/user-logout.service";
import {SocialLoginService} from "./services/social-login.service";
import {SocialLoginController} from "./controllers/social-login.controller";
import {GoogleStrategy} from "./strategy/google.strategy";
import {ConfigModule} from "@nestjs/config";
import {FacebookStrategy} from "./strategy/facebook.strategy";
import {OtpController} from "./controllers/otp.controller";
import {OtpService} from "./services/otp.service";
import {UserService} from "../user/services/user.service";
import { UserForgotPasswordService } from "./services/user-forgot-password.service";
@Module({
    imports: [GatewayModule,  ConfigModule.forRoot()],
    providers: [
        ApiResponseService,
        UserRegistrationService,
        UserLoginService,
        UserLogoutService,
        UserPasswordResetService,
        UserPasswordResetService,
        SocialLoginService,
        GoogleStrategy,
        FacebookStrategy,
        OtpService,
        UserService,
        UserForgotPasswordService
    ],
    controllers: [AuthenticationController, SocialLoginController, OtpController],
  })
  export class AuthenticationModule {}
