import { styled } from "styled-components";
import { CancelButton } from "./CancelButton/CancelButton";
import { NextStep } from "./NextStep";
import { useState } from "react";
import { ClosedButton } from "./ClosedButton";

export const Footer = () => {
  const [active, setActive] = useState(null);
  const [isClosed, setIsClosed] = useState(false);

  const handleChangeActive = (value) => setActive(value);

  const handleClose = () => {
    setIsClosed(true);
    setActive(null);
  };

  return (
    <StyledFooter className="flex items-center">
      {isClosed ? (
        <ClosedButton />
      ) : (
        <>
          <CancelButton
            active={active}
            onChangeActive={handleChangeActive}
            onClose={handleClose}
          />
          <NextStep active={active} onChangeActive={handleChangeActive} />
        </>
      )}
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  position: relative;
`;
