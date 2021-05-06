import { FC } from 'react';
import { Provider, useSelector } from 'react-redux';
import type { AppContext, AppProps } from 'next/app';
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
