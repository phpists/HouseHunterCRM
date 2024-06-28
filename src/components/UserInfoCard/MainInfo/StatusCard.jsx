import styled from "styled-components";

export const StatusCard = ({ status, title, subtitle }) => (
  <StyledStatusCard status={status}>
    <div className="title">{title}</div>
    <div className="subtitle">{subtitle}</div>
  </StyledStatusCard>
);

const StyledStatusCard = styled.div`
  padding: 8px 10px;
  border-radius: 9px;
  transition: all 0.3s;
  text-align: left;
  .title {
    color: ${({ status }) => (status ? "var(--green-light-2)" : "#FF4343")};
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%;
    letter-spacing: 0.28px;
    margin-bottom: 2px;
    span {
      color: var(--green-light-3);
    }
  }
  .subtitle {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  &:hover {
    background: ${({ status }) =>
      status ? " var(--card-bg-2)" : "rgba(255, 67, 67, 0.10)"};
  }
`;
