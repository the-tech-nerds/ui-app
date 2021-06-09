import { GatewayService } from '@the-tech-nerds/common-services';
import { Injectable } from "@nestjs/common";
import { AddressRequest } from "../requests/address.request";

@Injectable()
export class AddressService {
    constructor(private readonly gatewayService: GatewayService) { }
    async create(addressRequest: AddressRequest) {
        addressRequest.lat = 0;
        addressRequest.long = 0;
        addressRequest.is_default = false;
        const addressInfo = await this.gatewayService.execute('auth', {
            path: '/api/v1/address',
            body: { ...addressRequest },
            method: 'POST'
        })
        return addressInfo
    }
    async getAllByUserId() {
        const addresses = await this.gatewayService.execute('auth', {
            path: '/api/v1/address/user/all',
            method: 'GET'
        })
        return addresses
    }
    async getById(id: number) {
        const addresses = await this.gatewayService.execute('auth', {
            path: '/api/v1/address/' + id,
            method: 'GET'
        })
        return addresses
    }
    async update(id: number, addressRequest: AddressRequest) {
        addressRequest.lat = 0;
        addressRequest.long = 0;
        const addressInfo = await this.gatewayService.execute('auth', {
            path: '/api/v1/address/' + id,
            body: { ...addressRequest },
            method: 'PUT'
        })
        return addressInfo
    }
    async delete(id: number) {
        const addressInfo = await this.gatewayService.execute('auth', {
            path: '/api/v1/address/' + id,
            method: 'DELETE'
        })
        return addressInfo
    }
    async getUserDefaultAddress() {
        let addressInfo = await this.gatewayService.execute('auth', {
            path: '/api/v1/address/user/default/',
            method: 'GET'
        })
        if (addressInfo?.data) {
            addressInfo.data.user_id = 0;
            addressInfo.data.created_by = 0;
            addressInfo.data.updated_by = 0;
        }
        return addressInfo;
    }
    async updateDefaultAddress(id: number) {
        const addressInfo = await this.gatewayService.execute('auth', {
            path: '/api/v1/address/default/' + id,
            method: 'PUT',
            body: null,
        })
        return addressInfo
    }

    async getCities() {
        const cities = await this.gatewayService.execute('auth', {
            path: '/api/v1/address/city/all',
            method: 'GET'
        })
        return cities;
    }

    async getDivsion() {
        const divisions = await this.gatewayService.execute('auth', {
            path: '/api/v1/address/division/all',
            method: 'GET'
        })
        return divisions
    }

    async getAreas() {
        const areas = await this.gatewayService.execute('auth', {
            path: '/api/v1/address/area/all',
            method: 'GET'
        })
        return areas;
    }
}
