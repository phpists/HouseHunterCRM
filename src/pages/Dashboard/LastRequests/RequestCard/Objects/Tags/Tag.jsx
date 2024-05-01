import styled from "styled-components";
import { ReactComponent as Like } from "../../../../../../assets/images/like.svg";

const COLORS = {
  green: { color: "var(--green-light-2)", bg: "var(--green-bg)" },
  red: { color: "#F93A3A", bg: "rgba(249, 58, 58, 0.3)" },
  blue: { color: "#58AFFF", bg: "rgba(88, 175, 255, 0.3)" },
  default: { color: "var(--element-super-dark-text)", bg: "var(--tag-bg)" },
};

export const Tag = ({ count = 0, title = "", className, type }) => (
  <StyledTag className={className} type={COLORS[type] ?? COLORS?.default}>
    {type !== "blue" && (
      <Like
        className={type === "green" ? "like" : type === "red" ? "dislike" : ""}
      />
    )}
    {Number(count) > 1000 ? "+1000" : count} {title}
  </StyledTag>
);

const StyledTag = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  background: ${({ type }) => type.bg};
  padding: 1px 3px 2px 3px;
  color: ${({ type }) => type.color};
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.22px;
  svg {
    margin-right: 7px;
    height: 15px;
    width: 15px;
    transform: rotate(180deg);
    path {
      stroke: var(--element-super-dark-text);
    }
    &.like {
      transform: rotate(0deg);
      path {
        stroke: var(--green-light-2);
      }
    }
    &.dislike {
      path {
        stroke: #f93a3a;
      }
    }
  }
`;
