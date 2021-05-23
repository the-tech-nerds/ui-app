import React from 'react';
import { Provider } from 'react-redux';
const { IntlProvider } = require('react-redux-multilingual');
import Head from 'next/head';
// Import custom components
import store from '../../store';
import translations from '../../constants/translations'
import { getAllProducts } from '../../actions'
// Features
import Layout from '../../components/app';

class Root extends React.Component {

    render() {
        const { children } = this.props;
        // store.dispatch(getAllProducts());

        return(
        	<Provider store={store}>
                <IntlProvider translations={translations} locale='en'>
				{/* <BrowserRouter basename={'/'} > */}
					{/* <ScrollContext> */}
                            <Layout>
                            <Head>
                                <title>Khan Fresh Corner | Category.</title>
                                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                                <link rel="stylesheet" type="text/css" href="/assets/css/nprogress.css" />
                            </Head>
                                {children}
                            </Layout>
					  {/* </ScrollContext> */}
					{/* </BrowserRouter> */}
                   </IntlProvider>
			</Provider>
    	);
    }
}

export default Root;
