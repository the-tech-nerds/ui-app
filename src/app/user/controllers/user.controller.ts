import {Body, Controller, Get, Post, Put, Render, Req} from '@nestjs/common';
import {UserService} from "../services/user.service";
import {UserUpdateRequest} from "../requests/user_update.request";
import {UpdatePhoneRequest} from "../requests/update-phone.request";
import {UpdateEmailRequest} from "../requests/update-email.request";
import { Request } from 'express';

@Controller()
export class UserController {
    constructor( private userService: UserService) {
    }

    @Get('/dashboard')
    @Render('dashboard')
    async index() {
        const response =  await this.userService.getById();
        return {'user': response};
    }
    @Get('/user/userInfo')
    async userInfo() {
        const response =  await this.userService.getById();
        return response;
    }
    @Put('/user/update')
    async update(@Body() userUpdateRequest : UserUpdateRequest) {
        const user =  await this.userService.update(userUpdateRequest);
        return {'user': user};
    }
    @Put('/user/phone/verify')
    async verifyPhoneNumber(): Promise<any>{
        const result =  await this.userService.verifyPhone();
        return result;
    }
    @Put('/user/phone/update')
    async updateVerifyPhoneNumber(@Body() request: UpdatePhoneRequest): Promise<any>{
        const result =  await this.userService.updateVerifyPhone(request);
        return result;
    }

    @Put('/user/email/update')
    async updateEmail(@Body() request: UpdateEmailRequest): Promise<any>{
        const result =  await this.userService.updateEmail(request);
        return result;
    }

    @Post('/user/email')
    async userInfoByEmail(@Req() request: Request) {
        const response =  await this.userService.getByEmail(request.body.email);
        return response;
    }
    @Post('/user/phone')
    async userInfoByPhone(@Req() request: Request) {
        const response =  await this.userService.getByPhone(request.body.phone);
        return response;
    }
}
