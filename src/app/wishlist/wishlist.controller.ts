import { Body, Controller, Get, Render, Post, Req, Res, Delete, Param } from '@nestjs/common';
import { WishlistService } from './wishlist.service';

@Controller()
export class WishlistController {
    constructor(private wishlistService: WishlistService) {
    }

    @Get('user/wishlist/')
    @Render('wishlist')
    async getUserWishlist() {
        const wishlist = await this.wishlistService.gets();
        return { wishlist };
    }
    @Post('wishlist/create')
    async addWishlist(@Body() wishlistRequest: any, @Req() req: any, @Res() res: any) {
        const data = req.headers.access_token || null;
        if (!data) {
            res.redirect('/login');
        }
        const result = await this.wishlistService.create(wishlistRequest);
        return res.send(result);
    }

    @Get('wishlist/list')
    async getWishlist() {
        const result = await this.wishlistService.gets();
        return result;
    }
    @Delete('user/wishlist/:id')
    async deleteWishlist(@Param('id') id: string) {
        const result = await this.wishlistService.delete(Number(id));
        return result;
    }
    @Delete('user/wishlist/list/all')
    async deleteAllWishlist() {
        const result = await this.wishlistService.deleteAll();
        return result;
    }
}


