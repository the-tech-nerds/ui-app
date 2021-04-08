import { FC } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
// import Sidebar from '../components/sidebar';
import '../pages/index.scss';
import '../components/common/index.scss';
import 'react-toastify/dist/ReactToastify.css';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div>
      {/* <div style={{ flexBasis: '30%', margin: 25 }}>
        <Sidebar />
      </div> */}
      <div>
        <Component {...pageProps} />
      </div>
    </div>
  );
};

export default MyApp;
