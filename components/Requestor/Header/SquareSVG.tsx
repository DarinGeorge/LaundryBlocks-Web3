import {styles} from '../../../styles/components/Requestor.tailwind';

export interface SquareProps {
  /** Specify width in em */
  width?: string;
  /** Specify height in em */
  height?: string;
}

export default function SquareSVG({width = '1em', height = '1em'}: SquareProps) {
  return (
    <div className={styles.svgContainer}>
      <svg viewBox='0 0 24 24' {...{width, height}}>
        <path fillRule='evenodd' clipRule='evenodd' d='M14 10h-4v4h4v-4zM7 7v10h10V7H7z' />
      </svg>
    </div>
  );
}
