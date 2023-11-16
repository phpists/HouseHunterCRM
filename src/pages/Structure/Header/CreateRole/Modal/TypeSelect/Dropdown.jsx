import styled from "styled-components";
import { TypeCard } from "./TypeCard/TypeCard";
import { useGetAllPerimissionsLevelsQuery } from "../../../../../../store/structure/structure.api";

export const Dropdown = ({ levels, active, onChange }) => {
  return (
    <StyledDropdown>
      {Object.entries(levels)
        .map((l) => l[1])
        ?.map((level, i) => (
          <TypeCard
            key={i}
            titles={level["0"]?.split(" - ")}
            type={level.level}
            active={active === Number(level.level)}
            onSelect={() => onChange(Number(level.level))}
          />
        ))}
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  left: 0;
  border-radius: 0px 0px 6px 6px;
  background: rgb(52 52 52);
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  gap: 10px;
  z-index: 100;
`;
