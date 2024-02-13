import { styled } from "styled-components";
import maskBackground from "../../assets/images/add-client-bg.svg";

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
    top: -18svw;
    right: ${({ type }) => (type === "login" ? 5 : -9)}svw;
    width: 37svw;
    opacity: 0.5;
  }
  .shape-2 {
    position: absolute;
    bottom: ${({ type }) => (type === "login" ? 10 : 10)}svw;
    left: ${({ type }) => (type === "login" ? -6 : 2)}svw;
    width: 37svw;
    opacity: 0.5;
  }
  @media (max-width: 1000px) {
    width: 80svw;
    right: ${({ type }) => (type === "login" ? -25 : 57)}vw;
    ${({ ishover, type }) =>
      ishover === "true" && type === "login" && "right: -20vw;"}
    &:hover {
      ${({ type }) => type === "login" && "right: -20vw;"}
    }
  }
  @media (max-width: 800px) {
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    transform: rotate(0deg);
    background: #2c2c2cca;
    backdrop-filter: blur(18.5px);
    .shape-1,
    .shape-2 {
      display: none;
    }
  }
`;
