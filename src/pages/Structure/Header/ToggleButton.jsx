import styled from "styled-components";

export const ToggleShowButton = ({ active, onClick }) => (
  <StyledToggleShowButton className={`${active && "active"}`} onClick={onClick}>
    Незакріплені працівники
  </StyledToggleShowButton>
);

const StyledToggleShowButton = styled.div`
  height: 32px;
  padding: 5px 16px 6px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  letter-spacing: 0.3px;
  text-transform: capitalize;
  transition: all 0.3s;
  margin-left: 20px;
  cursor: pointer;
  .plus-icon {
    width: 26px;
    height: 26px;
    padding: 4px;
    margin-right: 4px;
  }
  &:hover,
  &.active {
    background: rgba(255, 255, 255, 0.2);
  }
`;
