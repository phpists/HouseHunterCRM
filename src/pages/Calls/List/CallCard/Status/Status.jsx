import styled from "styled-components";
import { Tag } from "./Tag";
import { Title } from "./Title";

export const Status = ({ status, type }) => {
  return (
    <StyledStatus className={`clickable ${type && "type"}`}>
      <Tag status={status} type={type} />
      <Title type={type} />
    </StyledStatus>
  );
};

const StyledStatus = styled.div`
  width: 140px;
  min-height: 60px;
  padding: 8px 10px;
  border-radius: 9px;
  transition: all 0.3s;
  /* &:hover {
    background:  var(--card-bg-2);
  } */
  &.type {
    width: 180px;
  }
  @media (min-width: 1400px) {
    width: 140px;
  }
  @media (min-width: 1600px) {
    width: 160px;
  }
`;
