import styled from "styled-components";

export const Tag = ({ title, color }) => {
  const COLORS = {
    orange: {
      color: "rgba(255, 159, 46, 0.90)",
      background: "rgba(255, 159, 46, 0.15)",
    },
    red: {
      color: "rgba(249, 58, 58, 0.90)",
      background: "rgba(249, 58, 58, 0.20)",
    },
    green: {
      color: "rgba(129, 251, 33, 0.90)",
      background: "rgba(129, 251, 33, 0.15)",
    },
  };

  return (
    <StyledTag color={COLORS[color]} className="clickable">
      {title}
    </StyledTag>
  );
};

const StyledTag = styled.div`
  color: ${({ color }) => color.color};
  leading-trim: both;
  text-edge: cap;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: ${({ color }) =>
    color.color === "rgba(249, 58, 58, 0.90)" ? 400 : 300};
  line-height: normal;
  letter-spacing: 0.22px;
  text-transform: capitalize;
  padding: 1px 4px 2px 4px;
  border-radius: 5px;
  background: ${({ color }) => color.background};
`;
