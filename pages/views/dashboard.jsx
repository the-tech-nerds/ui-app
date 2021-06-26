import Root from 'components/layouts/Root';
import React from 'react';
import Head from 'next/head';
import { Dashboard as ComponentDashboard } from '../../components/pages/dashboard';
import '../../components/styles/user_dashbord.module.scss';
import { useSelector } from 'react-redux';

const Dashboard = () => {

    const user = useSelector(state => state.login.user);
    return (
        <div>
            <Head>
                <title>Khan Fresh Corner | User Dashboard.</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" type="image/png" sizes="32x32" href="favicon.ico" />
            </Head>
            { user && <ComponentDashboard user={user} />}
        </div>
    );
}

export default Dashboard;
