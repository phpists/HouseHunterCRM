import { styled } from "styled-components";
import { Button } from "./Button";
import { useState } from "react";
import { Dropdown } from "./Dropdown";

export const Filter = ({ className }) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledFilter className={`flex items-center justify-center ${className}`}>
      <Button open={open} onClick={() => setOpen(!open)} />
      <Dropdown open={open} />
    </StyledFilter>
  );
};

const StyledFilter = styled.button`
  position: relative;
`;
