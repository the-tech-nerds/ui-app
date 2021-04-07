import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";
import { config } from 'dotenv';
config();
@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
    constructor() {
        super({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: process.env.FACEBOOK_CALL_BACK,
            scope: "email",
            profileFields: ['emails', 'name', 'photos', 'id'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void
    ): Promise<any> {
        const { name, emails, id, photos } = profile;
        const user = {
            email: emails? emails[0].value : undefined,
            firstName: name? name.givenName : 'FirstName',
            lastName: name? name.familyName : 'Last NAme',
            facebook_profile_id: id,
            picture: photos? photos[0].value : undefined,
            accessToken: accessToken
        };
        done(null, user);
    }
}
