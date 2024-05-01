import styled from "styled-components";
import { Tag } from "./Tag";
import { Title } from "./Title";

export const Status = ({ status }) => {
  return (
    <StyledStatus className="clickable">
      <Tag status={status} />
      <Title />
    </StyledStatus>
  );
};

const StyledStatus = styled.div`
  width: 140px;
  height: 60px;
  padding: 8px 10px;
  border-radius: 9px;
  transition: all 0.3s;
  /* &:hover {
    background:  var(--card-bg-2);
  } */
  @media (min-width: 1400px) {
    width: 140px;
  }
  @media (min-width: 1600px) {
    width: 160px;
  }
`;
