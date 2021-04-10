import Root from 'components/layouts/Root';
import React from 'react';
import Head from 'next/head';
import '../../components/styles/user_dashbord.module.scss'
import ComponentAddressBook from '../../components/pages/address-book';

const Address = ({ address }) => (<div>
    <Head>
        <title>Khan Fresh Corner | The best place to find fresh vegetables.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Root>
        <ComponentAddressBook address={address} />
    </Root>
</div>)

export async function getServerSideProps(ctx) {
    const { address } = ctx.query;
    if (address) {
        return {
            props: {
                address: address.data
            }
        }
    }

    return {
        props: {
            address: null
        }
    };
}

export default Address;