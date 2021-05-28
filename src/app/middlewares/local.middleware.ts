import {PreventRouteAfterLogin, PreventRouteBeforeLogin} from "../utils/app.route";

export const LocalsMiddleware = async (req: any, res: any, next: Function) => {
    res.header({ 'Cache-Control': 'no-cache, max-age=6000, must-revalidate' });

    if (!req.url.includes('sockjs') && !req.url.includes('?t=')) {
        if (req.headers && req.headers.access_token) {
            next();
            return;
        }

        if (req.signedCookies && req.signedCookies.r_code) {
            req.headers.access_token = req.signedCookies.r_code;
            req.headers.user_id = req.signedCookies.u_id;
            const urls = PreventRouteAfterLogin.filter( x =>x == req.baseUrl);
            if (urls.length > 0) {
                res.redirect('/');
                return;
            } else {
                next();
                return;
            }
        }
        else{
            const urls = PreventRouteBeforeLogin.filter( x =>x == req.baseUrl);
            if (urls.length > 0) {
                res.redirect('/');
                return;
            }

        }
    }
    next();
};
