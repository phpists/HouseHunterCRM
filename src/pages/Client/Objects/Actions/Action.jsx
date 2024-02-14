import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

export const Action = ({
  icon,
  title,
  color,
  background,
  className,
  onChangeHover,
  active,
  index,
  link,
}) => (
  <StyledAction
    color={color}
    className={`flex flex-col items-center justify-center ${className}`}
    background={background}
    onMouseEnter={() => onChangeHover(index)}
    onMouseLeave={() => onChangeHover(null)}
    active={active}
    index={index}
    to={link}
  >
    <img src={icon} alt="" />
    <span>{title}</span>
  </StyledAction>
);

const StyledAction = styled(NavLink)`
  padding: 15px;
  border-radius: 14px;
  border: 1px dashed ${({ color }) => color};
  width: 50%;
  cursor: pointer;
  transition: all 0.3s;
  height: 74px;
  overflow: hidden;
  position: relative;
  span {
    color: #fff;
    text-align: center;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    opacity: 0.4;
    margin-top: 5px;
    width: max-content;
    transition: all 0.3;
  }
  img {
    height: 21px;
    width: 21px;
  }

  &:before {
    content: "";
    display: block;
    background: ${({ color }) => `${color}40`};
    width: 200%;
    height: 200%;
    position: absolute;
    border-radius: 200% 200% 0 0;
    transform: translateY(100%);
    transition: all 0.5s;
  }

  &:hover {
    border: 1px solid ${({ color }) => color};
    span {
      opacity: 1;
    }
    &:before {
      transform: translateY(0%);
    }
  }

  @media (max-width: 700px) {
    width: 100% !important;
    margin: 0;
  }

  @media (min-width: 700px) {
    ${({ active, index }) =>
      active &&
      active === index &&
      `
        background: ${({ background }) => background};
        width: 100%;
        span {
            opacity: 1;
        }
    `}
    ${({ active, index }) =>
      active &&
      active !== index &&
      `
        padding: 27px;
        width: 74px;
        span {
            opacity: 0;
            height: 0;
            margin: 0;
        }
    `}
  }
`;
