import styled from "styled-components";
import closeIcon from "../../assets/images/close-.svg";

export const CloseButton = ({ onClick }) => (
  <StyledCloseButton
    className="flex items-center justify-center"
    onClick={onClick}
  >
    <img src={closeIcon} alt="" />
  </StyledCloseButton>
);

const StyledCloseButton = styled.button`
  padding: 14px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 30px;
  img {
    height: 12px;
  }
`;
