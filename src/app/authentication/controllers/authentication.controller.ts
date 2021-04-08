import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { UserRegistrationRequest } from '../requests/user-registration.request';
import { UserRegistrationService } from '../services/user-registration.service';
import { Response } from 'express';
import { UserLoginRequest } from "../requests/user-login.request";
import { UserLoginService } from "../services/user-login.service";
import { UserResetPasswordRequest } from "../requests/reset-password.request";
import { UserPasswordResetService } from "../services/user-password-reset.service";
import { UserLogoutService } from "../services/user-logout.service";
import { UserService } from "../../user/services/user.service";
import { CreatePasswordRequest } from "../requests/create-password.request";
import { UserForgotPasswordService } from '../services/user-forgot-password.service';
import { ForgetPasswordCompleteRequest } from '../requests/ForgetPasswordCompleteRequest';
// import {ConfigService} from "@nestjs/config";

@Controller()
export class AuthenticationController {
    constructor(
        private userRegistrationService: UserRegistrationService,
        private userLoginService: UserLoginService,
        private userResetPasswordService: UserPasswordResetService,
        private userLogOutService: UserLogoutService,
        private userService: UserService,
        private userForgotPasswordService: UserForgotPasswordService
    ) {
    }

    @Get('/register')
    @Render('register')
    async index() {
        return {};
    }
    @Post('/sign-up')
    async signUp(@Body() userRegistrationRequest: UserRegistrationRequest, @Res() res: Response) {
        await this.userRegistrationService.register(userRegistrationRequest);
        res.redirect('/login')
    }
    @Get('/login')
    @Render('login')
    async loadLoginPage(@Body() userLoginRequest: UserLoginRequest) {
        return {};
    }
    @Post('/login')
    async signIn(@Body() userLoginRequest: UserLoginRequest, @Res() res: any): Promise<any> {
        const result = await this.userLoginService.login(userLoginRequest);
        if (result.code === 200) {
            const cookieParams = {
                httpOnly: true,
                signed: true,
                maxAge: 60 * 100 * 100 * 100,
            };
            res.cookie('r_code', result.access_token, cookieParams);
            res.redirect('/');
        }
        return result;
    }

    @Get('/change-password')
    @Render('change-password')
    async passwordChange() {
        const response = await this.userService.getById();
        return { 'user': response };
    }

    @Post('/change-password')
    async changePassword(@Body() request: UserResetPasswordRequest, @Res() res: Response) {
        request.user_id = 0;
        await this.userResetPasswordService.changePassword(request);
        this.userLogOutService.logout();
        res.clearCookie('r_code');
        res.redirect('/login')
    }
    @Post('/create-password')
    async createPassword(@Body() request: CreatePasswordRequest, @Res() res: Response) {
        request.user_id = 0;
        await this.userResetPasswordService.createPassword(request);
        res.redirect('/dashboard')
    }

    @Get('/forgot-password')
    @Render('forgot-password')
    async pageForgotPassword() {
        return {}
    }
    @Post('/recover/password')
    async forgotPassword(@Body() fgPasswordRequest: ForgetPasswordCompleteRequest, @Res() res: Response) {
        await this.userForgotPasswordService.createPassword(fgPasswordRequest);
        res.redirect('/login')
    }
    @Get('/logout')
    async logOut(@Res() res: any) {
        this.userLogOutService.logout();
        res.clearCookie('r_code');
        return res.redirect('/login');
    }

    @Get('/login/check')
    async isLogin(@Req() req: any) {
        const data = req.headers.access_token || null;
        if (data) {
            return {
                code: 200,
                isLogin: true
            };
        }
        return {
            code: 401,
            isLogin: false
        };
    }
}
