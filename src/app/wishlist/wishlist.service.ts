import { GatewayService } from '@the-tech-nerds/common-services';
import { Injectable } from "@nestjs/common";;

@Injectable()
export class WishlistService {
    constructor(private readonly gatewayService: GatewayService) { }

    async create(wishlistRequest: any) {
        let wishlist = await this.gatewayService.execute('product', {
            path: '/api/v1/wishlist/',
            method: 'POST',
            body: { ...wishlistRequest },
        })
        return wishlist;
    }
    async gets() {
        let wishlists = await this.gatewayService.execute('product', {
            path: '/api/v1/wishlist/list/all',
            method: 'GET'
        })
        return wishlists;
    }
    async delete(id: number) {
        let wishlists = await this.gatewayService.execute('product', {
            path: '/api/v1/wishlist/' + id,
            method: 'DELETE'
        })
        return wishlists;
    }
    async deleteAll() {
        let wishlists = await this.gatewayService.execute('product', {
            path: '/api/v1/wishlist/all',
            method: 'DELETE'
        })
        return wishlists;
    }
}
