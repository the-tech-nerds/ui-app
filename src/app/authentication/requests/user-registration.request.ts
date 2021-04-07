import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class UserRegistrationRequest {
  @IsNotEmpty({ message: 'First Name is required.' })
  first_name: string;

  @IsNotEmpty({ message: 'Last Name is required.' })
  last_name: string;

  @IsEmail()
  email?: string;

  phone?: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(8, { message: 'Password must be atleast 8 charracters' })
  password: string;

  @IsNotEmpty({ message: 'Email or phone number verify failed.' })
  is_verified: boolean

  is_email_verified?: boolean;
  
  is_mobile_verified? : boolean;
  
  is_used_promotion?: boolean;
}
