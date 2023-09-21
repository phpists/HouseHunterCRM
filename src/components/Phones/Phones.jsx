import { styled } from "styled-components";
import { Phone } from "./Phone";
import { Arrow } from "./Arrow";
import { useState } from "react";
import { Dropdown } from "./Dropdown";

export const Phones = ({ top, className, classNameContent }) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledPhones open={open} className={`${className}`}>
      <Phone showOnHoverIcon className={classNameContent} />
      <Arrow open={open} onToggleOpen={() => setOpen(!open)} />
      <Dropdown open={open} onSelect={() => setOpen(false)} top={top} />
    </StyledPhones>
  );
};

const StyledPhones = styled.div`
  position: relative;
  border-radius: ${({ open }) => (open ? "6px 6px 0 0" : "6px")};
  flex-shrink: 0;
  height: max-content;
  display: grid;
  grid-template-columns: max-content max-content;
  width: max-content;
`;
