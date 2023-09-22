import styled from "styled-components";
import { Tag } from "./Tag";
import { Title } from "./Title";

export const Status = () => {
  return (
    <StyledStatus className="clickable">
      <Tag status={2} />
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
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;
