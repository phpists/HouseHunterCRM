import { styled } from "styled-components";

export const Option = ({ title, active, onSelect }) => (
  <StyledOption
    className={`flex items-center justify-between ${active && "active"}`}
    onClick={onSelect}
  >
    {title}
  </StyledOption>
);

const StyledOption = styled.div`
  padding: 8px 19px 6px 11px;
  transition: all 0.3s;
  color: #2c2c2c;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  span {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s;
  }
  &:hover,
  &.active {
    background: rgba(44, 44, 44, 0.07);
  }
`;
