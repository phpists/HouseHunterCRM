import { styled } from "styled-components";
import { Card } from "./Card/Card";

export const List = ({ selected, onSelect }) => {
  const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <StyledList className="hide-scroll">
      {data.map((e, i) => (
        <Card
          key={i}
          selected={!!selected.find((s) => s === i)}
          onSelect={() => onSelect(i)}
        />
      ))}
    </StyledList>
  );
};

const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  overflow: auto;
  height: calc(100svh - 232px);
  @media (max-width: 1600px) {
    height: calc(100svh - 302px);
  }
`;
