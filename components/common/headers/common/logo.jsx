import React from 'react';

function LogoImage(props) {

    return <a href={`${process.env.PUBLIC_URL}/`} >
                <img src={`${process.env.PUBLIC_URL}/assets/images/icon/${props.logo}`} alt="" className="img-fluid" />
            </a>;
}

export default LogoImage;
