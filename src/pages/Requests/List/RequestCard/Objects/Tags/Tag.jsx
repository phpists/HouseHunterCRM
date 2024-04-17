import styled from "styled-components";
import { ReactComponent as Like } from "../../../../../../assets/images/like.svg";
import { ReactComponent as Loader } from "../../../../../../assets/images/refresh-icon.svg";

const COLORS = {
  green: { color: "#50F835", bg: "rgba(80, 248, 53, 0.3)" },
  red: { color: "#F93A3A", bg: "rgba(249, 58, 58, 0.3)" },
  blue: { color: "#58AFFF", bg: "rgba(88, 175, 255, 0.3)" },
  default: { color: "#919191", bg: "#5A5A5A" },
};

export const Tag = ({
  count = 0,
  title = "",
  className,
  type,
  onClick,
  loading,
}) => (
  <StyledTag
    className={`${className} clickable`}
    type={COLORS[type] ?? COLORS?.default}
    onClick={onClick}
  >
    {type !== "blue" && (
      <Like
        className={type === "green" ? "like" : type === "red" ? "dislike" : ""}
      />
    )}
    {Number(count) > 1000 ? "+1000" : count} {title}
    {onClick ? (
      <Loader className={`refreshIcon ${loading && "active"}`} />
    ) : null}
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
      stroke: #919191;
    }
    &.like {
      transform: rotate(0deg);
      path {
        stroke: #50f835;
      }
    }
    &.dislike {
      path {
        stroke: #f93a3a;
      }
    }
  }
  .refreshIcon {
    margin-left: 5px;
    path {
      fill: ${({ type }) => type.color};
      stroke: none;
    }
    &.active {
      animation: 2s infinite load linear;
      @keyframes load {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
`;
