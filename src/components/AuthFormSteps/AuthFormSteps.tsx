import { useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

export interface IStepComponentState {
  from: "teacher" | "donor" | "recovery-password";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

export interface IStepComponentProps {
  step: number;
  totalSteps: number;
  componentsState: IStepComponentState[];
  nextStep: (state: IStepComponentState) => void;
}

interface Props {
  renderComponents: ((props: IStepComponentProps) => React.ReactElement)[];
}

const AuthFormSteps = ({ renderComponents }: Props) => {
  const totalSteps = renderComponents.length;
  const [step, setStep] = useState(0);
  const [componentsState, setComponentsState] = useState<IStepComponentState[]>([]);

  const nextStep = (state: IStepComponentState) => {
    setComponentsState((prev) => {
      const newState = [...prev];
      newState[step] = state;
      return newState;
    });
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <div className={styles.container}>
      {renderComponents.map((Component, index) => {
        return step === index ? (
          <Component
            key={Component.name}
            step={step}
            totalSteps={totalSteps}
            componentsState={componentsState}
            nextStep={nextStep}
          />
        ) : null;
      })}

      <div className={styles.stepIconsContainer}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className={clsx(styles.stepIcon, step >= index && styles.active)} />
        ))}
      </div>
    </div>
  );
};

export default AuthFormSteps;
