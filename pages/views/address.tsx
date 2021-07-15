import Root from 'components/layouts/Root';
import React from 'react';
import Head from 'next/head';
import '../../components/styles/user_dashbord.module.scss'
import { AddressBook } from '../../components/pages/address-book';
import {fetchUserAddressApi} from "../../api/address";


const Address = ({ address }: any) => (<div>
    <Head>
        <title>Khan Fresh Corner | The best place to find fresh vegetables.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {address && <AddressBook address={address} />}
</div>)


Address.getInitialProps = async (ctx: any) => {
    let item = ctx.query.address?.data || null;
    console.log(item);
    if(!item){
        const res = await fetchUserAddressApi();
        item = res?.data?.address?.data
    }

    return {
            address: item
    }
}

export default Address;
