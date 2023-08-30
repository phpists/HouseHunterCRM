import { styled } from "styled-components";
import { ReactComponent as RemoveIcon } from "../../../../../../../../assets/images/remove.svg";
import { IconButton } from "../../../../../../../../components/IconButton";

export const RemoveBtn = ({ onClick }) => (
  <StyledRemoveBtn>
    <IconButton Icon={RemoveIcon} onClick={onClick} className="remove-button" />
  </StyledRemoveBtn>
);

const StyledRemoveBtn = styled.div`
  .remove-button {
    border: none;
  }
`;
