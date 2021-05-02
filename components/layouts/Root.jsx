import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { ScrollContext } from 'react-router-scroll-4';   
const { IntlProvider } = require('react-redux-multilingual');
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
