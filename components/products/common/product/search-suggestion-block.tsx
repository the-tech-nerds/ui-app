import React from 'react';
import Link from 'next/link';
import {ShoppingCart} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import {Product} from 'types';
import Image from '../../../../components/image/image';
import {useRouter} from 'next/router'

type SearchSuggestionBlockProps = {
    product: Product;
}
const SearchSuggestionBlock = ({product}: SearchSuggestionBlockProps) => {
    const router = useRouter();
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        router.push(`/product/${product.slug}`)
    }
    return (
        <div className="d-flex flex-fill flex-row bd-highlight mb-1 card hover-product">
            <div className="p-1 bd-highlight d-flex justify-content-center image-block"
                 style={{alignItems: 'center'}}>

                {/*<img style={{maxHeight: "50px", maxWidth: "50px"}} src={product.images[0].url} alt=""/>*/}
                <Image src={product?.images?.length > 0 ? product.images[0].url : ''} height={50} width={50}
                       alt={product.name}/>
            </div>
            <div className="p-1 ml-3 bd-highlight flex-fill" onClick={handleClick}>
                <div className="d-flex">
                    <Link href={`/product/${product.slug}`}>
                        <span className="font-weight-bold">{product.name}</span>
                    </Link>
                </div>
                <div className="d-flex">
                    <span className="font-weight-bold">{product?.productVariances[0]?.price} Tk
                        {/*<del><span className="money">{symbol}{product.variance_price}</span></del> */}
                    </span>
                </div>

                {/*<div className="d-flex">*/}
                {/*    {product.stock_count > 0 && <span className="text-success">in stock</span>}*/}
                {/*    {product.stock_count == 0 && <span className="text-danger">out of stock!</span>}*/}
                {/*</div>*/}
            </div>
            {/*<div className="p-2 bd-highlight">*/}
            {/*    <IconButton color="secondary" component="span">*/}
            {/*        <ShoppingCart/>*/}
            {/*    </IconButton>*/}
            {/*</div>*/}
        </div>
    )
}

export default SearchSuggestionBlock;
