import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { useState } from "react";
import { FirstStep } from "./FirstStep";
import { SecondStep } from "./SecondStep/SecondStep";
import { ThirdStep } from "./ThirdStep/ThirdStep";
import { ForthStep } from "./ForthStep/ForthStep";
import { Footer } from "./Footer/Footer";

export const Steps = () => {
  const [step, setStep] = useState(1);

  return (
    <StyledSteps>
      <div className="steps-wrapper">
        <Header step={step} onChangeStep={(value) => setStep(value)} />
        <div className="steps-content">
          {step === 1 ? (
            <FirstStep />
          ) : step === 2 ? (
            <SecondStep />
          ) : step === 3 ? (
            <ThirdStep />
          ) : step === 4 ? (
            <ForthStep />
          ) : null}
        </div>
      </div>
      <Footer />
    </StyledSteps>
  );
};

const StyledSteps = styled.div`
  width: 100%;
  .steps-wrapper {
    border-radius: 14px;
    background: var(--bg-10);
    .steps-content {
      padding: 6px;
      margin-bottom: 10px;
    }
  }
`;
