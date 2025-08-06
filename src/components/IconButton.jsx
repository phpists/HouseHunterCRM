import { styled } from "styled-components";

export const IconButton = ({
  Icon,
  onClick,
  className,
  active,
  title = "",
}) => (
  <StyledIconButton
    onClick={onClick}
    className={`flex items-center justify-center iconButton ${className} ${
      active ? "active" : ""
    }`}
    title={title}
  >
    <Icon />
  </StyledIconButton>
);

const StyledIconButton = styled.button`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  border: var(--second-color-border, 1px solid rgba(255, 255, 255, 0.2));
  background: transparent;
  -webkit-backdrop-filter: blur(18.5px); /* Safari prefix */
  backdrop-filter: blur(18.5px);
  cursor: pointer;
  svg {
    height: 60%;
  }
  g {
    transition: opacity 0.3s ease;
    -webkit-transition: opacity 0.3s ease; /* Safari prefix */
  }
  &:hover,
  &.active {
    background: var(--bg-20, rgba(255, 255, 255, 0.2));
    border: none;
    g {
      opacity: 1;
    }
  }
  &.active {
    border: 1.2px solid #fff;
  }
`;
