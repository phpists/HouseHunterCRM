import { styled } from "styled-components";

export const Selected = ({ value, onChnage, selectedCount }) => (
  <StyledSelected className="flex items-center">
    <div className={`${value === 1 || (selectedCount > 0 && "active")}`}>
      {selectedCount ? selectedCount : "0"}
    </div>
  </StyledSelected>
);

const StyledSelected = styled.div`
  padding: 3px;
  border-radius: 7px;
  background: #323232;
  color: rgba(255, 255, 255, 0.4);
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 12.98px */
  letter-spacing: 0.22px;
  text-transform: uppercase;
  div {
    padding: 4px 6px 1px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    &.active {
      background: #fff;
      color: #2c2c2c;
      font-weight: 600 !important;
    }
  }
`;
