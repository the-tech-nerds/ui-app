import { Injectable } from '@nestjs/common';
import { GatewayService } from '@the-tech-nerds/common-services';
@Injectable()
export class ShopService {
    constructor( private readonly gatewayService: GatewayService) {}

    async getAll() {
        let shops = await this.gatewayService.execute('product',{
            path: '/api/v1/shop/list/all',
            method: 'GET'
        });
        return shops;
    }
}
