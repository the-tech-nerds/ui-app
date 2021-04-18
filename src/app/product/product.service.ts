import { GatewayService } from '@the-tech-nerds/common-services';
import { Injectable } from "@nestjs/common";;

@Injectable()
export class ProductService {
    constructor(private readonly gatewayService: GatewayService) { }

    async getProductBySlug(slug: string) {
        return this.gatewayService.execute('product', {
            path: `/api/v1/product/public/${slug}`,
            method: 'GET'
        })
    }

}
