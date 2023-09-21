import styled from "styled-components";

export const Colors = () => (
  <StyledColors>
    <div style={{ background: "#1BBC9B" }} />
    <div style={{ background: "#ADD5F7" }} />
    <div style={{ background: "#EF5350" }} />
    <div style={{ background: "#FF822E" }} />
    <div style={{ background: "#FFF176" }} />
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
