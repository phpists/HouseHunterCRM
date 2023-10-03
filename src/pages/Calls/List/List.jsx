import styled from "styled-components";
import { CallCard } from "./CallCard/CallCard";
import { useState } from "react";

export const List = ({ selected, onSelect }) => {
  const data = [1, 1, 1, 11, 1, 1, 11, 1, 1, 1, 1];
  const [openMore, setOpenMore] = useState(null);

  return (
    <StyledList className="hide-scroll">
      {data.map((d, i) => (
        <CallCard
          key={i}
          selected={!!selected.find((j) => j === 1 + i)}
          onSelect={() => onSelect(1 + i)}
          openMore={openMore === i}
          onOpenMore={() => setOpenMore(openMore === i ? null : i)}
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
  @media (max-width: 600px) {
    height: calc(100svh - 252px);
  }
`;
