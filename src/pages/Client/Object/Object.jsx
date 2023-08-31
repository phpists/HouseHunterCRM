import { styled } from "styled-components";
import { SectionTitle } from "./SectionTitle";
import { Maininfo } from "./Maininfo/MainInfo";
import { StartButton } from "./StartButton";
import { useState } from "react";
import { Steps } from "./Steps/Steps";

export const Object = () => {
  const [started, setStarted] = useState(true);

  return (
    <StyledObject className="hide-scroll">
      <SectionTitle title="Оренда квартири" />
      <Maininfo />
      {started ? (
        <>
          <SectionTitle title="Етап" />
          <Steps />
        </>
      ) : (
        <StartButton onClick={() => setStarted(true)} />
      )}
    </StyledObject>
  );
};

const StyledObject = styled.div`
  border-radius: 15px;
  background: #2b2b2b;
  width: 360px;
  padding: 10px;
  height: calc(100svh - 238px);
  overflow: auto;
  overflow-x: hidden;
`;
