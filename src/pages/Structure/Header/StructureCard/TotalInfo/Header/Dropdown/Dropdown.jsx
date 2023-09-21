import styled from "styled-components";
import { Option } from "./Option";
import { useState } from "react";

export const Dropdown = () => {
  const [active, setActive] = useState(0);

  return (
    <StyledDropdown className="notClickable">
      <Option
        title="Остані 30 днів"
        active={active === 0}
        onSelect={() => setActive(0)}
      />
      <Option
        title="Остані 60 днів"
        active={active === 1}
        onSelect={() => setActive(1)}
      />
      <Option
        title="Остані 90 днів"
        active={active === 2}
        onSelect={() => setActive(2)}
        last
      />
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 10;
`;
