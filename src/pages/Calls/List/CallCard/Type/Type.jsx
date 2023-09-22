import styled from "styled-components";
import { Tag } from "./Tag";

export const Type = () => {
  return (
    <StyledType className="clickable">
      <Tag />
      <div className="title clickable">Назва потоку</div>
    </StyledType>
  );
};

const StyledType = styled.div`
  padding: 8px 10px;
  width: 120px;
  border-radius: 9px;
  transition: all 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  .title {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
`;
