import { styled } from "styled-components";

export const Option = ({ title, onSelect }) => (
  <StyledOption className="flex items-center justify-between">
    {title} <span>→</span>
  </StyledOption>
);

const StyledOption = styled.div`
  padding: 8px 19px 6px 11px;
  transition: all 0.3s;
  color: #2c2c2c;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  span {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s;
  }
  &:hover {
    background: rgba(44, 44, 44, 0.07);
    span {
      opacity: 1;
      transform: translateX(0px);
    }
  }
`;
