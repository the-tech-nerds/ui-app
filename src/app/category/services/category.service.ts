import { GatewayService } from '@the-tech-nerds/common-services';
import { Injectable } from "@nestjs/common";;

@Injectable()
export class CategoryService {
    constructor(private readonly gatewayService: GatewayService) { }

    async getAll(shopTypeId: string = undefined) {
        return this.gatewayService.execute('product', {
            path: '/api/v1/category/menu/all',
            method: 'GET',
            qs: {
                shop_type_id: shopTypeId,
            }
        })
    }

    async getProductsByCategorySlug(slug: string, shopId: string) {
        return this.gatewayService.execute('product', {
            path: `/api/v1/category/${slug}/products`,
            qs: {
                shop_id: shopId,
            },
            method: 'GET'
        })
    }
}
