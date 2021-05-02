import { FC } from 'react';
import { Provider } from 'react-redux';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/'
// import Sidebar from '../components/sidebar';
import '../pages/index.scss';
import '../components/common/index.scss';
import store from 'store';
import { checkLogin, fetchItemsForWishlist, fetchItemsForCategory, fetchItemsForShop } from 'actions';
import { GetStaticProps } from 'next';
import Root from 'components/layouts/Root';

const initialActions = () => {
  store.dispatch(checkLogin());
  store.dispatch(fetchItemsForWishlist());
  store.dispatch(fetchItemsForCategory());
  store.dispatch(fetchItemsForShop());
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
