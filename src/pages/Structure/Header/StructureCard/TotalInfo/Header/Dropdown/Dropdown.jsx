import styled from "styled-components";
import { Option } from "./Option";

export const Dropdown = ({ period, onChangePeriod }) => {
  return (
    <StyledDropdown className="notClickable">
      <Option
        title="Остані 30 днів"
        active={period === 30}
        onSelect={() => onChangePeriod(30)}
      />
      <Option
        title="Остані 60 днів"
        active={period === 60}
        onSelect={() => onChangePeriod(60)}
      />
      <Option
        title="Остані 90 днів"
        active={period === 90}
        onSelect={() => onChangePeriod(90)}
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
