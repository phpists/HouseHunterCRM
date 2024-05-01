import { styled } from "styled-components";
import removeIcon from "../../../../../assets/images/remove.svg";

export const RemoveBtn = ({ onClick }) => (
  <StyledRemoveBtn
    className="flex items-center justify-center"
    onClick={onClick}
  >
    <img src={removeIcon} alt="" />
  </StyledRemoveBtn>
);

const StyledRemoveBtn = styled.div`
  width: 45px;
  height: 45px;
  flex-shrink: 0;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    border: 1px solid #fff;
    background: var(--bg-20);
  }
`;
