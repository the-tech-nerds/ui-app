import styles from './Skeleton.module.css';

type SkeletonProps = {
    width: number;
    height?: number;
};

export const Skeleton = ({
    width,
    height,
}: SkeletonProps) => (
    <div className={styles['placeholder-item']} style={{ height, width }}></div>
)
