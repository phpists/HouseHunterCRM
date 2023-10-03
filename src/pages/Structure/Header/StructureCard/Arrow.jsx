import styled from "styled-components";
import imgArrow from "../../../../assets/images/structure-arrow-card.svg";

export const Arrow = ({ onClick }) => (
  <StyledArrow onClick={onClick}>
    <img src={imgArrow} alt="" />
  </StyledArrow>
);

const StyledArrow = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1660px) {
    position: absolute;
    top: 11px;
    right: 11px;
  }
  @media (max-width: 850px) {
    display: none;
  }
`;
