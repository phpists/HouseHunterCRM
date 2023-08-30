import { styled } from "styled-components";

const STATUSES = {
  1: {
    title: "Керівник",
    color: "#58AFFF",
    background: "rgba(88, 175, 255, 0.3)",
  },
  2: { title: "Агент", color: "#58FF5E", background: "rgba(88, 255, 94, 0.3)" },
};

export const Status = ({ status, className }) => (
  <StyledStatus
    status={STATUSES[status]}
    className={`flex items-center justify-center ${className}`}
  >
    {STATUSES[status].title}
  </StyledStatus>
);

const StyledStatus = styled.div`
  width: 68px;
  height: 18px;
  padding: 4px 0 1px;
  color: ${({ status }) => status.color};
  background: ${({ status }) => status.background};
  text-align: center;
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%; /* 12.98px */
  letter-spacing: 0.22px;
  text-transform: uppercase;
  border-radius: 5px;
  margin-right: 9px;
`;
