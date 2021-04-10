import { Body, Controller, Delete, Get, Param, Post, Put, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AddressRequest } from "../requests/address.request";
import { AddressService } from "../services/address.service";

@Controller('address')
export class AddressController {
    constructor(private addressService: AddressService) {
    }

    @Get('/')
    @Render('address')
    async index() {
        const response = await this.addressService.getAllByUserId();
        console.log(response);
        return { 'address': response };
    }
    @Get('/cities')
    async loadCity() {
        const cities = [{
            id: 1,
            division_id: 1,
            name: 'dhaka'
        }]
        return cities;
    }
    @Get('/areas')
    async loadArea() {
        const areas = [{
            id: 1,
            city_id: 1,
            name: 'badda'
        }]
        return areas;
    }
    @Get('/division')
    async loadDivisions() {
        const divisions = [{
            id: 1,
            name: 'Dhaka'
        }]
        return divisions;
    }
    @Post('/')
    async add(@Body() addressRequest: AddressRequest, @Res() res: Response): Promise<any> {
        await this.addressService.create(addressRequest);
        res.redirect('/user/address');
    }
    @Put('/:id')
    async update(@Param('id') id: number, @Body() addressRequest: AddressRequest, @Res() res: Response) {
        const address = await this.addressService.update(id, addressRequest);
        return address;
    }

    @Delete('/:id')
    async delete(@Param('id') id: number, @Res() res: Response) {
        const result = await this.addressService.delete(id);
        return result;
    }
    @Get('/default')
    async getUserDefaultAddress(): Promise<any> {
        const result = await this.addressService.getUserDefaultAddress(1);
        return result;
    }

}
