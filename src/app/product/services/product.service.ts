import {GatewayService} from '@the-tech-nerds/common-services';
import {Injectable} from "@nestjs/common";

@Injectable()
export class ProductService {
    constructor(private readonly gatewayService: GatewayService) {
    }

    async getProductsBySearchParam(query: string) {
        return this.gatewayService.execute('product', {
            path: `/api/v1/product/search/?search=${query}&limit=10`,
            method: 'GET'
        })
    }
}
