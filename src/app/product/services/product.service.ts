import {GatewayService} from '@the-tech-nerds/common-services';
import {Injectable} from "@nestjs/common";

@Injectable()
export class ProductService {
    constructor(private readonly gatewayService: GatewayService) {
    }

    async getProductsBySearchParam(query: string, shopId: string, limit = 10) {
        return this.gatewayService.execute('product', {
            path: `/api/v1/product/search`,
            qs: {
                search: query,
                shop_id: shopId,
            },
            method: 'GET',
        })
    }
    
    async getProductBySlug(slug: string) {
        return this.gatewayService.execute('product', {
            path: `/api/v1/product/public/${slug}`,
            method: 'GET'
        })
    }

}
