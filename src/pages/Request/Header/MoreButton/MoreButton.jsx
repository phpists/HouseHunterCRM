import styled from "styled-components";
import { ReactComponent as OptionsIcon } from "../../../../assets/images/options.svg";
import { useState } from "react";
import { Dropdown } from "./Dropdown";

export const MoreButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <StyledMoreButton
        className={`flex items-center justify-center ${open && "open"}`}
        onClick={() => setOpen(!open)}
      >
        <OptionsIcon />
      </StyledMoreButton>
      <Dropdown open={open} />
    </div>
  );
};

const StyledMoreButton = styled.button`
  margin-left: 15px;
  width: 32px;
  height: 32px;
  border-radius: 5px;
  border: 1.6px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(18.5px);
  transition: all 0.3s;
  &:hover,
  &.open {
    border: 1.6px solid rgba(255, 255, 255, 1);
    g {
      opacity: 1;
    }
  }
  @media (min-width: 800px) {
    display: none;
  }
`;
