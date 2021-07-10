import {Controller, Get, Param, Render} from '@nestjs/common';

import {ProductService} from '../services/product.service';
import {OfferService} from "../services/offer.service";

@Controller('offer')
export class OfferController {
    constructor(private readonly offerService: OfferService) {
    }
    @Get('/list/:shop')
    @Render('offer/offer')
    async getOffers(
        @Param('shop') shop_id: string
    ) {
        const data = await this.offerService.geActiveOffers(shop_id);
        return {
            offers:data
        };
    }
}
