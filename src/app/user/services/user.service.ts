import { GatewayService } from '@the-tech-nerds/common-services';
import {Injectable} from "@nestjs/common";
const moment  = require("moment");
import {Gender} from "../../utils/enum/global.enum";
import {UserUpdateRequest} from "../requests/user_update.request";
import {UpdatePhoneRequest} from "../requests/update-phone.request";
import {UpdateEmailRequest} from "../requests/update-email.request";

// @Injectable()
export class UserService {
    constructor( private readonly gatewayService: GatewayService) {}

    async getById() {
        let user = await this.gatewayService.execute('auth',{
            path: '/api/v1/user/profile/info',
            method: 'GET'
        });
        if(user?.data){
            user.data.birthday = user.data.birthday ? moment(user.data.birthday).format('YYYY-MM-DD') : 'N/A';
            user.data.id = null;
            user.data.image_url = user.data.image_url? user.data.image_url: 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png';
            user.data.phone_number = user.data.phone ? user.data.phone : 'N/A';
            if(!user.data.gender_type){
                user.data.gender = 'N/A'
            }
            else if(user.data.gender_type === Gender.Male){
                user.data.gender = 'Male'
            }
            else if(user.data.gender_type === Gender.Female){
                user.data.gender = 'Female'
            }
            else if(user.data.gender_type === Gender.Other){
                user.data.gender = 'Other'
            }
        }

        return user;
    }

    async update(userUpdateRequest: UserUpdateRequest) {
        let user = await this.gatewayService.execute('auth',{
            path: '/api/v1/user/profile/info/',
            method: 'PUT',
            body: {...userUpdateRequest},
        })
        return user;
    }
    async verifyPhone() {
        let res = await this.gatewayService.execute('auth',{
            path: '/api/v1/user/phone/verify/',
            method: 'PUT',
        })
        return res;
    }
    async updateVerifyPhone(request: UpdatePhoneRequest) {
        let res = await this.gatewayService.execute('auth',{
            path: '/api/v1/user/update/phone/',
            method: 'PUT',
            body: {...request},
        })
        return res;
    }

    async updateEmail(request: UpdateEmailRequest) {
        let res = await this.gatewayService.execute('auth',{
            path: '/api/v1/user/update/email/',
            method: 'PUT',
            body: {...request},
        })
        return res;
    }

    async getByEmail(email: string) {
        let user = await this.gatewayService.execute('auth',{
            path: '/api/v1/user/check/email',
            method: 'GET',
           qs:{
               email: email,
               userType: '2'
           },
        })
        // if(user.data){
        //     throw new BadRequestException(`${email} already exist.please login with this email.`)
        // }
        return user;
    }
    async getByPhone(phone: string) {
        let user = await this.gatewayService.execute('auth',{
            path: '/api/v1/user/check/phone',
            method: 'GET',
           qs:{
               phone: phone,
               userType: '2'
           },
        })
        // if(user.data){
        //     throw new BadRequestException(`${phone} already exist.please login with this phone number.`)
        // }
        return user;
    }
}
