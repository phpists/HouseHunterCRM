import styled from "styled-components";

const STATUSES = {
  error: {
    color: "#F93A3A",
    bg: "#F93A3A",
    title: "Помилка",
  },
  moderation: {
    color: "#FF9F2EE5",
    bg: "#FF9F2E26",
    title: "На модерації",
  },
  active: {
    color: "var(--green-tag)",
    bg: "var(--green-tag-bg)",
    title: "Рекламується",
  },
};

export const Status = ({ status }) => (
  <StyledStatus status={STATUSES[status]} className="flex items-center">
    {STATUSES[status]?.title}
  </StyledStatus>
);

const StyledStatus = styled.div`
  height: 18px;
  padding: 0 4px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 200;
  line-height: 14.98px;
  letter-spacing: 0.02em;
  text-align: left;
  color: ${({ status }) => status.color};
  background: ${({ status }) => status.bg};
`;
