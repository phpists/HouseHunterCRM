import { styled } from "styled-components";
import { Phone } from "./Phone";
import { Arrow } from "./Arrow";
import { useState } from "react";
import { Dropdown } from "./Dropdown";

export const Phones = () => {
  const [open, setOpen] = useState(false);

  return (
    <StyledPhones className="flex items-center" open={open}>
      <Phone showOnHoverIcon />
      <Arrow open={open} onToggleOpen={() => setOpen(!open)} />
      <Dropdown open={open} onSelect={() => setOpen(false)} />
    </StyledPhones>
  );
};

const StyledPhones = styled.div`
  position: relative;
  border-radius: ${({ open }) => (open ? "6px 6px 0 0" : "6px")};
  flex-shrink: 0;
  height: max-content;
`;
