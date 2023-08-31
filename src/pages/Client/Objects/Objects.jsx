import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { Actions } from "./Actions/Actions";
import { Card } from "./Card/Card";

export const Objects = ({ selected, onSelect }) => {
  const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <StyledObjects>
      <Header />
      <div className="objects-content hide-scroll">
        <Actions />
        {data.map((c, i) => (
          <Card
            key={1}
            selected={selected === i}
            onSelect={() => onSelect(i)}
          />
        ))}
      </div>
    </StyledObjects>
  );
};

const StyledObjects = styled.div`
  border-radius: 15px;
  background: #2b2b2b;
  .objects-content {
    padding: 10px;
    height: calc(100svh - 295px);
    overflow: auto;
  }
`;
