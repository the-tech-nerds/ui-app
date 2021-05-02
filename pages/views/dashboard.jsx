import Root from 'components/layouts/Root';
import React from 'react';
import Head from 'next/head';
import { Dashboard as ComponentDashboard } from '../../components/pages/dashboard';
import '../../components/styles/user_dashbord.module.scss'
import { UserService } from 'src/app/user/services/user.service';
const Dashboard = ({ user }) => (<div>
    <Head>
        <title>Khan Fresh Corner | User Dashboard.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Root>
        <ComponentDashboard user={user} />
    </Root>
</div>)

export async function getServerSideProps(ctx) {
    const { user } = ctx.query;
    if (user) {
        return {
            props: {
                user: user.data
            }
        }
    }

    return {
        props: {
            user: null
        }
    };
}

export default Dashboard;
