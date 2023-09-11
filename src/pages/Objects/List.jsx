import styled from "styled-components";
import { ObjectCard } from "../../components/ObjectCard/ObjectCard";

export const List = ({ selected, onSelect }) => {
  const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <StyledList className="hide-scroll">
      {data.map((d, i) => (
        <ObjectCard
          key={i}
          selected={!!selected.find((j) => j === 1 + i)}
          onSelect={() => onSelect(1 + i)}
        />
      ))}
    </StyledList>
  );
};

const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  height: calc(100svh - 225px);
  overflow: auto;
  gap: 10px;
`;
