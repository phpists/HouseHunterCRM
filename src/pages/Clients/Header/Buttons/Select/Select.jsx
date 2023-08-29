import { styled } from "styled-components";
import { Title } from "./Title";
import { Selected } from "./Selected";
import { useState } from "react";
import { Arrow } from "./Arrow";
import { Dropdown } from "./Dropdown";

export const Select = () => {
  const [type, setType] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-10">
      <StyledSelect className="flex items-center" open={open}>
        <Title />
        <Selected
          value={type}
          onChnage={(value) => setType(type === value ? null : value)}
        />
        {type && <Arrow open={open} onToggleOpen={() => setOpen(!open)} />}
      </StyledSelect>
      {open && <Dropdown />}
    </div>
  );
};

const StyledSelect = styled.div`
  border-radius: ${({ open }) => (open ? "8px 8px 0 0" : "8px")};
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(18.5px);
  padding: 4px 4px 4px 12px;
  position: relative;
  transition: all 0.3s;
  z-index: 12;
`;
