import { GatewayService } from '@the-tech-nerds/common-services';
import {Injectable} from "@nestjs/common";
import {AddressRequest} from "../requests/address.request";

@Injectable()
export class AddressService {
    constructor( private readonly gatewayService: GatewayService) {}
    async create(addressRequest: AddressRequest) {
        addressRequest.user_id = 1;
        addressRequest.lat = 0;
        addressRequest.long = 0;
        addressRequest.is_default = false;
        const addressInfo = await this.gatewayService.execute('auth',{
            path: '/api/v1/address',
            body: {...addressRequest},
            method: 'POST'
        })
        return addressInfo
    }
    async getAllByUserId() {
        const addresses = await this.gatewayService.execute('auth',{
            path: '/api/v1/address/all',
            method: 'GET'
        })
        return addresses
    }
    async getById(id: number) {
        const addresses = await this.gatewayService.execute('auth',{
            path: '/api/v1/address/' + id,
            method: 'GET'
        })
        return addresses
    }
    async update(id: number, addressRequest: AddressRequest) {
        const addressInfo = await this.gatewayService.execute('auth',{
            path: '/api/v1/address' + id,
            body: {...addressRequest},
            method: 'PUT'
        })
        return addressInfo
    }
    async delete(id: number) {
        const addressInfo = await this.gatewayService.execute('auth',{
            path: '/api/v1/address' + id,
            method: 'DELETE'
        })
        return addressInfo
    }
    async getUserDefaultAddress(id: number) {
        const addressInfo = await this.gatewayService.execute('auth',{
            path: '/api/v1/address/user/default/' + id,
            method: 'GET'
        })
        return addressInfo
    }
}
