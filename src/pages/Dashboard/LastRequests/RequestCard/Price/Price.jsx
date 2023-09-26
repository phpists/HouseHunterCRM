import styled from "styled-components";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";
import { Date } from "./Date";

export const Price = () => (
  <StyledPrice className="flex items-center justify-between">
    <div>
      <Title />
      <Subtitle subtitle="Бажана ціна" />
    </div>
    <div>
      <Date />
      <Subtitle subtitle="Термін запиту" />
    </div>
  </StyledPrice>
);

const StyledPrice = styled.div`
  padding: 6px 14px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 10px;
`;
