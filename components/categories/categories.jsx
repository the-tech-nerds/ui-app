import React from 'react';
import Slider from 'react-slick';
import Category from '../../components/categories/category';

const CategoryList = ({ categories = [] }) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: categories.length < 4 ? categories.length : 4,
        slidesToScroll: 2,
    };
  
    return (
        <div className="card m-4 p-4">
            <h4>Categories</h4>
            <Slider {...settings} className="slide-1 home-slider">    
                {categories.map(category => <Category category={category} />)}
            </Slider>
        </div>
    );
};

export default CategoryList;