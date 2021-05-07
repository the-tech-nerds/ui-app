import Root from 'components/layouts/Root';
import React from 'react';
import Head from 'next/head';
import '../../components/styles/user_dashbord.module.scss'
import ComponentResetPassword from '../../components/pages/change-password';

const ChangePassword = ({ user }) => (<div>
    <Head>
        <title>Khan Fresh Corner | The best place to find fresh vegetables.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <ComponentResetPassword user={user} />
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

export default ChangePassword;