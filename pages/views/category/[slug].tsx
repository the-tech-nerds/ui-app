import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import '../../../components/categories/category.module.scss';
import ComponentCategoryList from '../../../components/categories/categories';
import ProductGrid from '../../../components/products/product-grid';
import { useSelector } from "react-redux";
import { Category, Shop } from 'types';

type CategoryListProps = {
    slug: string;
};

const CategoryList = ({ slug }: CategoryListProps) => {
    const [categories, setCategories] = useState([]);
    const [currentCategory, setcurrentcategory] = useState(null);
    const menus: Category[] = useSelector(state => state?.categories?.list) || [];

    useEffect(() => {
        const searchForCategorySlug =
            (cateogryList: Category[] = [], searchSlug: string = ''): Category | null => {
                let foundCategory = null;
                for (let category of cateogryList) {
                    if (category.slug === searchSlug) {
                        foundCategory = category;
                        break;
                    }

                    const matchedCategory = searchForCategorySlug(category.children, searchSlug);
                    if (matchedCategory) {
                        foundCategory = matchedCategory;
                        break;
                    }
                }
                return foundCategory;
            }

        const selectedCategory: Category = searchForCategorySlug(menus, slug);
        if (selectedCategory) {
            setcurrentcategory(selectedCategory);
            setCategories(selectedCategory.children);
        }
    }, [slug]);

    if (!categories.length) {
        return <span />
    }

    return (
        <div style={{ marginTop: '4%' }}>
            <ComponentCategoryList categories={categories} category={currentCategory} />
        </div>
    )
}


type ProductListProps = {
    slug: string;
    // fetchUrl: string
}

const ProductList = ({ slug }: ProductListProps) => {
    const currentShop: Shop = useSelector(state => state.shops.current);
    const [apiUrl, setApiUrl] = useState(null);
    useEffect(() => {
        setApiUrl(`/category-product/${currentShop.id}/${slug}`);
    }, [slug])

    return <ProductGrid key={slug} fetchUrl={apiUrl} />;
};

type CategroyProductProps = {
    slug: string;
    fetchUrl: string
}

const CategoryProducts = ({ slug, fetchUrl }: CategroyProductProps) => {
    return (
        <div>
            <Head>
                <title>Khan Fresh Corner | Category.</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div>
                <CategoryList slug={slug} />
                <ProductList slug={slug} />
            </div>
        </div>
    )
}

CategoryProducts.getInitialProps = (ctx: any) => {
    return {
        slug: ctx.query.slug,
    }
}

export default CategoryProducts;
