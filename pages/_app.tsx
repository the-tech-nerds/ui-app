import {FC} from 'react';
import type {AppProps} from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import '../pages/index.scss';
import '../components/common/index.scss';
import store from 'store';
import {checkLogin, fetchItemsForShop} from 'actions';
import Root from 'components/layouts/Root';

const initialActions = () => {
  store.dispatch(fetchItemsForShop());
  store.dispatch(checkLogin());
};

NProgress.configure({ showSpinner: true });

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
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
