import { styled } from "styled-components";
import checkIcon from "../assets/images/circle-green-check.svg";

export const Option = ({
  title,
  onSelect,
  active,
  className,
  noSelect,
  Component,
  error,
}) => {
  return (
    <StyledOption
      className={`flex items-center justify-between ${className} ${
        error ? "error-field" : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect && onSelect();
      }}
      active={active?.toString()}
      role="option"
      aria-selected={active}
    >
      <span className="flex items-center">
        {Component}
        {title}
      </span>
      <img src={checkIcon} alt="Check" />
    </StyledOption>
  );
};

const StyledOption = styled.div`
  padding: 8px 17px 6px 11px;
  color: var(--main-color, #333);
  font-family: Overpass, sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease; /* Safari prefix */
  cursor: pointer;
  background: var(--bg-20, rgba(255, 255, 255, 0.1));
  background: linear-gradient(
    90deg,
    var(--bg-20, rgba(255, 255, 255, 0.1)) 0%,
    var(--bg-10, rgba(255, 255, 255, 0.2)) 100%
  );
  background-size: 200% 100%;
  border-bottom: 1px solid var(--bg-10, rgba(255, 255, 255, 0.1));
  text-align: left;
  &:hover {
    background-position: 100% 0;
  }
  img {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    -webkit-transition: opacity 0.3s ease, visibility 0.3s ease; /* Safari prefix */
  }
  ${({ active }) =>
    active === "true" &&
    `
    color: var(--green-light-2, #34c759);
    background: rgba(52, 199, 89, 0.1);
    img {
        opacity: 1;
        visibility: visible;
    }
  `}
`;
