import {GatewayService} from '@the-tech-nerds/common-services';
import {Injectable} from "@nestjs/common";

@Injectable()
export class OfferService {
    constructor(private readonly gatewayService: GatewayService) {
    }

    async geActiveOffers(shopId: string) {
        return this.gatewayService.execute('product', {
            path: `/api/v1/offer/active/all`,
            qs: {
                shop_id: shopId,
            },
            method: 'GET',
        })
    }

    async getOfferBySlug(slug: string) {
        return this.gatewayService.execute('product', {
            path: `/api/v1/offer/detail/${slug}`,
            method: 'GET'
        })
    }

}
