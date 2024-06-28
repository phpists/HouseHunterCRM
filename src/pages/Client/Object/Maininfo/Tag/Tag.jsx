import { styled } from "styled-components";

export const Tag = ({ Icon, text, className, onHover }) => (
  <StyledTag
    className={`flex items-center ${className}`}
    onMouseEnter={() => (onHover ? onHover(true) : null)}
    onMouseLeave={() => (onHover ? onHover(false) : null)}
  >
    <Icon />
    <span>{text}</span>
  </StyledTag>
);

const StyledTag = styled.div`
  color: var(--main-color);
  font-family: Open Sans;
  font-size: 13px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.26px;
  span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 1.4;
  }
  svg {
    flex-shrink: 0;
    height: 16px;
    width: 16px;
    margin-right: 6px;
    g {
      opacity: 1;
    }
  }
`;
