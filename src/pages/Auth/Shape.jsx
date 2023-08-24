import { styled } from "styled-components";
import maskBackground from "../../assets/images/auth-shape-mask.svg";

export const Shape = ({ ishover, onChangeishover, type }) => (
  <StyledShape
    ishover={ishover}
    onMouseEnter={() => onChangeishover("true")}
    onMouseLeave={() => onChangeishover("false")}
    type={type}
  >
    <img src={maskBackground} alt="" className="shape-1" />
    <img src={maskBackground} alt="" className="shape-2" />
  </StyledShape>
);

const StyledShape = styled.div`
  position: absolute;
  width: 50svw;
  height: 200vh;
  transform: rotate(15deg);
  background: #2c2c2c;
  top: -20%;
  right: ${({ type }) => (type === "login" ? -5 : 67)}vw;
  overflow: hidden;
  transition: all 0.8s;
  z-index: 1;
  ${({ ishover, type }) =>
    ishover === "true" && type === "login" && "right: -3vw;"}
  &:hover {
    ${({ type }) => type === "login" && "right: -3vw;"}
  }
  img {
    transition: all 0.3s;
  }
  .shape-1 {
    position: absolute;
    top: -25svw;
    right: ${({ type }) => (type === "login" ? 5 : -9)}svw;
    width: 37svw;
  }
  .shape-2 {
    position: absolute;
    bottom: ${({ type }) => (type === "login" ? -5 : -5)}svw;
    left: ${({ type }) => (type === "login" ? -6 : 2)}svw;
    width: 37svw;
  }
`;
