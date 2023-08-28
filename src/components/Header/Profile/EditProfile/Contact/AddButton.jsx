import { styled } from "styled-components";
import plusIcon from "../../../../../assets/images/plus.svg";

export const AddButton = ({ onClick }) => (
  <StyledAddButton
    className="flex items-center justify-center"
    onClick={onClick}
  >
    <img src={plusIcon} alt="" />
  </StyledAddButton>
);

const StyledAddButton = styled.div`
  width: 45px;
  height: 45px;
  flex-shrink: 0;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    border: 1px solid #fff;
    background: rgba(255, 255, 255, 0.2);
  }
`;
