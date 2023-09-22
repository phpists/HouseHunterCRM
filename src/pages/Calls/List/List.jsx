import styled from "styled-components";
import { CallCard } from "./CallCard/CallCard";

export const List = ({ selected, onSelect }) => {
  const data = [1, 1, 1, 11, 1, 1, 11, 1, 1, 1, 1];

  return (
    <StyledList className="hide-scroll">
      {data.map((d, i) => (
        <CallCard
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
  grid-auto-rows: max-content;
  height: calc(100svh - 225px);
  overflow: auto;
  gap: 10px;
`;
