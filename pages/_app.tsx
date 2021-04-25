import { FC } from 'react';
import { Provider } from 'react-redux';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/'
// import Sidebar from '../components/sidebar';
import '../pages/index.scss';
import '../components/common/index.scss';
import store from 'store';
import { checkLogin, fetchItemsForWishlist } from 'actions';
import { GetStaticProps } from 'next';

const initialActions = () => {
  store.dispatch(checkLogin());
  store.dispatch(fetchItemsForWishlist());
};


const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  initialActions();
  return (
   <Provider store={store}>
      <div>
      {/* <div style={{ flexBasis: '30%', margin: 25 }}>
        <Sidebar />
      </div> */}
      <div>
        <Component {...pageProps} />
      </div>
    </div>
   </Provider>
  );
};

// export const getServerSideProps: GetStaticProps = async () => {
//   console.log('here');
//   store.dispatch(fetchWishlist());
//   return {
//     props: {},
//   }
// }


export default MyApp;
