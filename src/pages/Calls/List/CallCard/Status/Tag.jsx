import styled from "styled-components";

const STATUS = {
  0: {
    title: "Не опрацьований",
    color: "#F93A3A",
    bg: "rgba(249, 58, 58, 0.20)",
  },
  1: {
    title: "Опрацьований",
    color: "#81FB21",
    bg: "rgba(129, 251, 33, 0.20)",
  },
};

export const Tag = ({ status }) => (
  <StyledTag status={STATUS[status]} className="clickable">
    {STATUS[status]?.title ?? "Відсутні в базі"}
  </StyledTag>
);

const StyledTag = styled.div`
  padding: 1px 8px 2px 8px;
  height: 20px;
  leading-trim: both;
  text-edge: cap;
  font-family: Open Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.24px;
  text-transform: capitalize;
  color: ${({ status }) => status?.color ?? "rgba(255, 255, 255, 0.60)"};
  background: ${({ status }) => status?.bg ?? "rgba(255, 255, 255, 0.20)"};
  margin-bottom: 8px;
  border-radius: 5px;
  width: max-content;
`;
