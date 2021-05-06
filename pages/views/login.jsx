import Root from 'components/layouts/Root';
import React from 'react';
import Head from 'next/head';
import '../../components/styles/user_dashbord.module.scss'
import ComponentLogin from '../../components/pages/login';

const Login = () => (<div>
    <Head>
        <title>Khan Fresh Corner | The best place to find fresh vegetables.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <ComponentLogin />
</div>)

export async function getServerSideProps(ctx) {
    return {
        props: {}
    };
}

export default Login;