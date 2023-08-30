import { styled } from "styled-components";
import { ReactComponent as PlusIcon } from "../../../../../../../../assets/images/plus.svg";
import { IconButton } from "../../../../../../../../components/IconButton";

export const AddButton = ({ onClick }) => (
  <StyledAddButton onClick={onClick}>
    <IconButton Icon={PlusIcon} onClick={onClick} className="add-button" />
  </StyledAddButton>
);

const StyledAddButton = styled.div`
  .add-button {
    border: none;
  }
`;
