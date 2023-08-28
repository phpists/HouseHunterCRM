import { styled } from "styled-components";
import { Banner } from "./Banner";
import { Subtitle } from "./Subtitle";

export const Header = ({ onOpenTarif, tarifOpen }) => (
  <StyledHeader onClick={onOpenTarif} tarifOpen={tarifOpen}>
    <Banner />
    <Subtitle />
  </StyledHeader>
);

const StyledHeader = styled.div`
  cursor: pointer;
  height: ${({ tarifOpen }) => (!tarifOpen ? 65 : 0)}px;
  margin-bottom: ${({ tarifOpen }) => (!tarifOpen ? 55 : 0)}px;
  opacity: ${({ tarifOpen }) => (!tarifOpen ? 1 : 0)};
  transform: translateX(${({ tarifOpen }) => (!tarifOpen ? 0 : "100px")});
  overflow: hidden;
  transition: all 0.3s;
  &:hover {
    img {
      transform: translateX(0px);
      opacity: 1;
    }
    .banner::before {
      width: 70%;
    }
  }
`;
