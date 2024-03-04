import styled from "styled-components";
import { ReactComponent as Icon } from "../assets/images/loader.svg";

export const Loader = ({ white, className }) => (
  <StyledLoader white={white?.toString()} className={className}>
    <Icon />
  </StyledLoader>
);

const StyledLoader = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    height: 100%;
    ${({ white }) => white === "true" && "circle {stroke: #FFF !important;}"}
  }
`;
