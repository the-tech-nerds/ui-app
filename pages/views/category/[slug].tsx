import Root from 'components/layouts/Root';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import '../../../components/categories/category.module.scss';
import ComponentCategoryList from '../../../components/categories/categories';
import ProductGrid from '../../../components/products/product-grid';

type CategoryListProps = {
    slug: string;
};

const CategoryList = ({ slug }: CategoryListProps) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const menu  = JSON.parse(localStorage.getItem('menu'));
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
        return <span />
    }

    return (
        <div style={{ marginTop: '4%' }}>
            <ComponentCategoryList categories={categories} />
        </div>
    )
}


type ProductListProps = {
    slug: string;
}

const ProductList = ({ slug }: ProductListProps) => {
    return <ProductGrid slug={slug}/>
};

type CategroyProductProps = {
    slug: string;
}

const CategoryProducts = ({ slug }: CategroyProductProps) => {
    return (
       <div>
            <Head>
                <title>Khan Fresh Corner | Category.</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Root>
                <CategoryList slug={slug} />
                <ProductList slug={slug} /> 
            </Root>
       </div>
    )
}

CategoryProducts.getInitialProps = (ctx: any) => {
    return {
        slug: ctx.query.slug,
    }
}            

export default CategoryProducts;