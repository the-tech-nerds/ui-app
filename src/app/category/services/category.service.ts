import { GatewayService } from '@the-tech-nerds/common-services';
import { Injectable } from "@nestjs/common";;

@Injectable()
export class CategoryService {
    constructor(private readonly gatewayService: GatewayService) { }

    async getAll() {
        return this.gatewayService.execute('product', {
            path: '/api/v1/category/menu/all',
            method: 'GET'
        })
    }
}
