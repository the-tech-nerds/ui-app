import { useState } from 'react';
import NextImage from 'next/image'
import { Skeleton } from '../skeleton-loader/skeletons';

type ImageProps = {
    src: string;
    className?: string;
    width: number;
    height: number;
    alt: string;
};

const Image = ({
    src = "",
    className,
    width,
    height,
    alt,
    ...restProps
}: ImageProps) => {
    const [loaded, setLoaded] = useState(false);
    const placeHolderImage = `https://via.placeholder.com/${width}?text=${alt}`;
    const defaultImageSrc = src || placeHolderImage;
    const [imageSrc, setImageSrc] = useState(defaultImageSrc);
    return (
        <div>
            {width && height ? <NextImage
                {...restProps}
                style={{
                    visibility: loaded ? 'visible' : 'hidden',
                    display: loaded ? 'block' : 'none',
                    width,
                    height
                }}
                src={imageSrc}
                className={className}
                width={loaded? width: 0}
                height={loaded ? height : 0}
                onLoad={() => setLoaded(true)}
                onError={() => setImageSrc(placeHolderImage)}
                alt={alt} 
            /> : <NextImage
                    {...restProps}
                    style={{
                        visibility: loaded ? 'visible' : 'hidden',
                        display: loaded ? 'block' : 'none',
                        width,
                        height
                    }}
                    src={imageSrc}
                    className={className}
                    onLoad={() => setLoaded(true)}
                    onError={() => setImageSrc(placeHolderImage)}
                    alt={alt} 
                />
            }
            {!loaded && <Skeleton height={height} width={width}/>}
        </div>
    );
}

export default Image;