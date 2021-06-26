import {FC} from 'react';
import type {AppProps} from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import '../pages/index.scss';
import '../components/common/index.scss';
import store from 'store';
import {checkLogin, fetchItemsForShop} from 'actions';
import Root from 'components/layouts/Root';
import { route } from 'next/dist/next-server/server/router';

const initialActions = () => {
  store.dispatch(fetchItemsForShop());
  store.dispatch(checkLogin());
};

NProgress.configure({ showSpinner: true });

Router.events.on('routeChangeStart', (route) => {
  if (!route.includes('search')) {
    NProgress.start();
  }
});

Router.events.on('routeChangeComplete', (route) => {
  if (!route.includes('search')) {
    NProgress.done();
  }
});

Router.events.on('routeChangeError', () => {
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
