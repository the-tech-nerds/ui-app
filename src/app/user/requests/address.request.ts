import { IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';

export class AddressRequest {
    @IsNotEmpty({ message: 'Address name is required.' })
    name: string;

    details: string;

    @IsNotEmpty({ message: 'Area is required.' })
    @IsNumber()
    area_id: number;

    @IsNotEmpty({ message: 'City is required.' })
    @IsNumber()
    city_id: number;

    @IsNotEmpty({ message: 'Division is required.' })
    @IsNumber()
    division_id: number;

    postcode: number;

    @IsNotEmpty({ message: 'Contact Number is required.' })
    contact_no: string;

    lat?: number;

    long?: number;

    is_default?: boolean;
}
