import { useState } from 'react';
import NextImage from 'next/image'
import { Skeleton } from '../skeleton-loader/skeletons';

type ImageProps = {
    src: string;
    className?: string;
    width?: number;
    height: number;
    alt: string;
    fullWidth?: boolean;
};

const Image = ({
    src = "",
    className,
    width,
    fullWidth = false,
    height,
    alt,
    ...restProps
}: ImageProps) => {
    const [loaded, setLoaded] = useState(false);
    const placeHolderImage = `https://via.placeholder.com/${fullWidth ? '600' : width }?text=${alt}`;
    const defaultImageSrc = src || placeHolderImage;
    const [imageSrc, setImageSrc] = useState(defaultImageSrc);
    return (
        <div>
            {width && height ? <img
                {...restProps}
                style={{
                    visibility: loaded ? 'visible' : 'hidden',
                    display: loaded ? 'block' : 'none',
                    width: fullWidth ? '100%' : width,
                    height
                }}
                // priority={true}
                src={imageSrc}
                className={className}
                width={loaded? fullWidth ? '100%': width : 0}
                height={loaded ? height : 0}
                onLoad={() => setLoaded(true)}
                onError={() => setImageSrc(placeHolderImage)}
                alt={alt} 
            /> : <img
                    {...restProps}
                    style={{
                        visibility: loaded ? 'visible' : 'hidden',
                        display: loaded ? 'block' : 'none',
                        width: fullWidth ? '100%' : width,
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