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
  color: #fff;
  text-overflow: ellipsis;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.05);
  padding: 6px 12px 6px 6px;
  cursor: pointer;
  span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 1.4;
  }
  svg {
    margin: -4px 4px 0 0;
    flex-shrink: 0;
    g {
      opacity: 1;
    }
  }
`;
