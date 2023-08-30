import { styled } from "styled-components";

export const Selected = ({ value, onChnage }) => (
  <StyledSelected className="flex items-center">
    <div onClick={() => onChnage(1)} className={`${value === 1 && "active"}`}>
      20 клієнтів
    </div>
    <div onClick={() => onChnage(2)} className={`${value === 2 && "active"}`}>
      усі 263
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
  font-weight: 300;
  line-height: 118%; /* 12.98px */
  letter-spacing: 0.22px;
  text-transform: uppercase;
  display: grid;
  grid-template-columns: max-content max-content;
  gap: 2px;
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
      font-weight: 600;
    }
  }
`;
