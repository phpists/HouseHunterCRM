import { styled } from "styled-components";

export const EnterStatus = ({ status }) => (
  <StyledEnterStatus status={status}>
    <div className="title">{status ? "Дозволено" : "Заборонено"}</div>
    <div className="subtitle">Вхід</div>
  </StyledEnterStatus>
);

const StyledEnterStatus = styled.div`
  padding: 7px 10px 6px;
  width: 100%;
  border-radius: 9px;
  transition: all 0.3s;
  cursor: pointer;
  text-align: left;
  .title {
    color: ${({ status }) => (status ? "#50F835" : "#ff5151")};
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
  .subtitle {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  &:hover {
    background: ${({ status }) =>
      status ? "rgba(255,255,255,0.05)" : "#FF43431A"};
  }
`;
