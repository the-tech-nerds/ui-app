import React from 'react';
import Link from 'next/link';
import Image from '../image/image';


const Category = ({ category }) => (
    <Link href={`/${category.slug}`} as={`/${category.slug}`}>
        <a>
            <div className="category">
                <div className="img-wrapper">
                    <div className="front">
                            <Image
                                src={`${category.images[0]}`}
                                className="img-fluid"
                                width={200}
                                height={150}
                                alt="" 
                            />
                    </div>
                </div>
                <div className="product-detail">
                    <div>
                            <h6>{category.name}</h6>
                    </div>
                </div>
            </div>
        </a>
    </Link>
);

export default Category;