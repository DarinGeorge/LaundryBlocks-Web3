import {styles} from '../../../styles/components/Requestor.tailwind';

export interface CircleProps {
  /** Specify width in em */
  width?: string;
  /** Specify height in em */
  height?: string;
}

export default function CircleSVG({width = '1em', height = '1em'}: CircleProps) {
  return (
    <div className={styles.svgContainer}>
      <svg viewBox='0 0 24 24' width='1em' height='1em'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M12 14a2 2 0 100-4 2 2 0 000 4zm5-2a5 5 0 11-10 0 5 5 0 0110 0z'
        />
      </svg>
    </div>
  );
}
