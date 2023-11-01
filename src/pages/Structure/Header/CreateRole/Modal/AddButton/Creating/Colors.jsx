import styled from "styled-components";

const COLORS_DATA = ["#1BBC9B", "#ADD5F7", "#EF5350", "#FF822E", "#FFF176"];

export const Colors = ({ active, onChange }) => (
  <StyledColors>
    {COLORS_DATA?.map((color, i) => (
      <div
        style={{ background: color, opacity: active === color ? 1 : 0.3 }}
        onClick={() => onChange(color)}
      />
    ))}
  </StyledColors>
);

const StyledColors = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  div {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }
`;
