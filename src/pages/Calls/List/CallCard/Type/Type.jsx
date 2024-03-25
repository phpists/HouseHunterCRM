import styled from "styled-components";
import { Tag } from "./Tag";

export const Type = ({ callType, agentPhone }) => {
  return (
    <StyledType className="clickable">
      <Tag callType={callType} />
      <div className="title clickable">Назва потоку</div>
      <div className="title clickable">{agentPhone ?? "-"}</div>
    </StyledType>
  );
};

const StyledType = styled.div`
  padding: 8px 10px;
  width: 140px;
  border-radius: 9px;
  transition: all 0.3s;
  /* &:hover {
    background: rgba(255, 255, 255, 0.05);
  } */
  .title {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
    white-space: nowrap;
  }

  @media (max-width: 1399.9px) {
    width: auto;
    padding: 0;
    margin-bottom: 16px;
    &:hover {
      background: rgba(255, 255, 255, 0);
    }
    .title {
      display: none;
    }
  }
  @media (min-width: 1400px) {
    width: 80px;
  }
  @media (min-width: 1600px) {
    width: 95px;
  }
`;
