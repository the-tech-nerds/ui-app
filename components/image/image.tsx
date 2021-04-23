import { useState } from 'react';
import { Skeleton } from '../skeleton-loader/skeletons';

type ImageProps = {
    src: string;
    className?: string;
    width: number;
    height: number;
    alt: string;
};

const Image = ({
    src,
    className,
    width,
    height,
    alt
}: ImageProps) => {
    const [loaded, setLoaded] = useState(false);
    const placeHolderImage = `https://via.placeholder.com/${width}`;
    const [imageSrc, setImageSrc] = useState(src || placeHolderImage);
    return (
        <div>
            <img
                style={{
                    visibility: loaded ? 'visible' : 'hidden',
                    display: loaded ? 'block' : 'none',
                    width,
                    height
                }}
                src={imageSrc}
                className={className}
                width={width}
                height={height}
                onLoad={() => setLoaded(true)}
                onError={() => setImageSrc(placeHolderImage)}
                alt={alt} 
            />
            {!loaded && <Skeleton height={height} width={width}/>}
        </div>
    );
}

export default Image;