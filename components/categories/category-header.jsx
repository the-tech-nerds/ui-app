import React from 'react';
import Link from 'next/link';
import Image from '../image/image';


const CategoryHeader = ({ category }) => (
  <div className="d-flex flex-row">
      <Image
          src={`${category.images[0]}`}
          className="img-fluid"
          width={'100%'}
          height={'20%'}
          alt=""
      />
  </div>
);

export default CategoryHeader;
