import {Controller, Get, Req, Res, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {SocialLoginService} from "../services/social-login.service";

@Controller('social')
export class SocialLoginController{
    constructor(private readonly socialLoginService: SocialLoginService) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req : any) {
    }

    @Get('/google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req : any, @Res() res: any) {
        const result = await this.socialLoginService.login(req.user);
        if (result.code === 200) {
            const cookieParams = {
                httpOnly: true,
                signed: true,
                maxAge: 60 * 100 * 100 * 100,
            };
            res.cookie('r_code', result.access_token, cookieParams);
            res.redirect('/dashboard');
        }
        return result;
    }

    @Get("facebook")
    @UseGuards(AuthGuard("facebook"))
    async facebookLogin(): Promise<any> {

    }
    @Get('/facebook/redirect')
    @UseGuards(AuthGuard('facebook'))
    async facebookAuthRedirect(@Req() req : any, @Res() res: any) {
        const result = await this.socialLoginService.loginByFacebook(req.user);
        if (result.code === 200) {
            const cookieParams = {
                httpOnly: true,
                signed: true,
                maxAge: 60 * 100 * 100 * 100,
            };
            res.cookie('r_code', result.access_token, cookieParams);
            res.redirect('/dashboard');
        }
        return result;
    }
}
