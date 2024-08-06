import clsx from "clsx";
import styles from "./styles.module.scss";

interface Props {
  isMobile?: boolean;
  step?: number;
  totalSteps?: number;
}

const Steps = ({ isMobile, step = -1, totalSteps = 0 }: Props) => {
  return (
    <div className={clsx(styles.stepIconsContainer, isMobile && styles.mobile)}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <div key={index} className={clsx(styles.stepIcon, step >= index && styles.active)} />
      ))}
    </div>
  );
};

export default Steps;
