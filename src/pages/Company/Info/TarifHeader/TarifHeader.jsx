import { styled } from "styled-components";
import { Banner } from "./Banner";
import { Subtitle } from "./Subtitle";

export const TarifHeader = ({ tarifOpen, onCloseTarif }) => (
  <StyledTarifHeader onClick={onCloseTarif} tarifOpen={tarifOpen}>
    <Banner />
    <Subtitle tarifOpen={tarifOpen} />
  </StyledTarifHeader>
);

const StyledTarifHeader = styled.div`
  cursor: pointer;
  padding: ${({ tarifOpen }) => (tarifOpen ? " 16px 0 0px 16px" : 0)};
  height: ${({ tarifOpen }) => (tarifOpen ? 81 : 0)}px;
  margin-bottom: ${({ tarifOpen }) => (tarifOpen ? 57 : 0)}px;
  overflow: hidden;
  transition: all 0.3s;
  opacity: ${({ tarifOpen }) => (tarifOpen ? 1 : 0)};
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
