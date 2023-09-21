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
`;
