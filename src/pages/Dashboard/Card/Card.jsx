import styled from "styled-components";
import { Icon } from "./Icon";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";

export const Card = ({ IconImg, title, subtitle }) => (
  <StyledCard className="flex items-center">
    <Icon IconImg={IconImg} />
    <div>
      <Title title={title} />
      <Subtitle subtitle={subtitle} />
    </div>
  </StyledCard>
);

const StyledCard = styled.div`
  padding: 5px;
  border-radius: 9px;
  background: var(--card-bg-2);
`;
