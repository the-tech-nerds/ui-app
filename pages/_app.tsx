import { FC } from 'react';
import { Provider, useSelector } from 'react-redux';
import type { AppContext, AppProps } from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import App from 'next/';
import '../pages/index.scss';
import '../components/common/index.scss';
import store from 'store';
import { checkLogin, fetchItemsForWishlist, fetchItemsForCategory, fetchItemsForShop, fetchUserDetails } from 'actions';
import Root from 'components/layouts/Root';

const initialActions = () => {
  store.dispatch(fetchItemsForShop());
  store.dispatch(checkLogin());
  store.dispatch(fetchUserDetails());
  store.dispatch(fetchItemsForWishlist());
};

NProgress.configure({ showSpinner: true });

Router.events.on('routeChangeStart', () => {
  console.log('onRouteChangeStart triggered');
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  console.log('onRouteChangeComplete triggered');
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  // console.log('onRouteChangeError triggered');
  NProgress.done();
});

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  initialActions();
  return (
   <Root>
      <div>
      {/* <div style={{ flexBasis: '30%', margin: 25 }}>
        <Sidebar />
      </div> */}
      <div>
        <Component {...pageProps} />
      </div>
    </div>
   </Root>
  );
};


export default MyApp;
