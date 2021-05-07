import Root from 'components/layouts/Root';
import React from 'react';
import ComponentHome from '../../components/pages/home';
import Head from 'next/head';

const Home = () => (<div>
    <Head>
        <title>Khan Fresh Corner | The best place to find fresh vegetables.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <ComponentHome />
</div>)

export default Home;
