import { styled } from "styled-components";
import { Card } from "./Card/Card";

const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

export const List = ({
  onOpenEdit,
  tarifSelected,
  selectedWorkers,
  onSelect,
}) => {
  return (
    <StyledList className="hide-scroll">
      {data.map((card, i) => (
        <Card
          key={i}
          onOpenEdit={onOpenEdit}
          onSelect={() => onSelect(1 + i)}
          tarifSelected={tarifSelected}
          isSelected={!!selectedWorkers.find((w) => w === 1 + i)}
        />
      ))}
    </StyledList>
  );
};

const StyledList = styled.div`
  height: calc(100svh - 155px - 64px);
  overflow: auto;
`;
