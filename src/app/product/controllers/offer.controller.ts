import {Controller, Get, Param, Render} from '@nestjs/common';

import {ProductService} from '../services/product.service';
import {OfferService} from "../services/offer.service";

@Controller('offer')
export class OfferController {
    constructor(private readonly offerService: OfferService) {
    }
    @Get('/view')
    @Render('offer/offer')
    async getOffers() {
        return {};
    }
    @Get('/list/:shop')
    async getProductItemsByCategorySlug(
        @Param('shop') shopId: string,
    ) {
        return this.offerService.geActiveOffers(shopId);
    }
    @Get('/detail/:slug')
    @Render('offer/detail')
    async getOfferDetail(
        @Param('slug') slug: string
    ) {
        const data = await this.offerService.getOfferBySlug(slug);
        return {
            offers:data
        };
    }
    @Get('/offer-detail/:slug')
    async getOffer(
        @Param('slug') slug: string
    ) {
        const data = await this.offerService.getOfferBySlug(slug);
        return {
            offers:data
        };
    }
}
