import styled from "styled-components";
import { ObjectCard } from "../../components/ObjectCard/ObjectCard";

export const List = ({ selected, onSelect, data }) => {
  return (
    <StyledList className="hide-scroll">
      {data.map((d, i) => (
        <ObjectCard
          key={i}
          selected={!!selected.find((j) => j === d?.id)}
          onSelect={() => onSelect(d?.id)}
          data={d}
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
  @media (max-width: 800px) {
    height: calc(100svh - 200px);
  }
`;
