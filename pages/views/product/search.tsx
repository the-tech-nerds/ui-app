import Root from 'components/layouts/Root';
import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import '../../../components/categories/category.module.scss';
import ComponentCategoryList from '../../../components/categories/categories';
import ProductGrid from '../../../components/products/product-grid';
import {useRouter} from 'next/router'

type CategoryListProps = {
    slug: string;
};

const CategoryList = ({slug}: CategoryListProps) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const menu = JSON.parse(localStorage.getItem('menu'));
        for (let category of menu) {
            if (category.slug === slug) {
                if (category.children && category.children.length > 0) {
                    setCategories(category.children);
                    break;
                }
            }
        }
    }, []);

    if (!categories.length) {
        return <span/>
    }

    return (
        <div style={{marginTop: '4%'}}>
            <ComponentCategoryList categories={categories}/>
        </div>
    )
}


type ProductListProps = {
    slug: string;
    searchKey: string
}

const ProductList = ({slug, searchKey}: ProductListProps) => {
    return <ProductGrid slug={slug} fetchUrl={'/product/search/' + searchKey}/>
};

type CategroyProductProps = {
    slug: string;
    searchKey: string,
}

const CategoryProducts = ({slug, searchKey}: CategroyProductProps) => {
    const router = useRouter();
    searchKey = router.asPath.replace('product/search?q=', '').replace('/', '');
    return (
        <div>
            <Head>
                <title>Khan Fresh Corner | Search Result.</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Root>
                <ProductList slug={slug} searchKey={searchKey}/>
            </Root>
        </div>
    )
}

CategoryProducts.getInitialProps = (ctx: any) => {
    return {
        slug: ctx.query.query,
    }
}

export default CategoryProducts;
