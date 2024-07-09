import styled from "styled-components";
import { SaveButton } from "./SaveButton";
import { IconButton } from "../../../../components/IconButton";
import { ReactComponent as RemoveIcon } from "../../../../assets/images/remove.svg";

export const Actions = () => {
  return (
    <StyledActions className="flex items-center">
      <SaveButton />
      <IconButton Icon={RemoveIcon} className="icon-btn" />
    </StyledActions>
  );
};

const StyledActions = styled.div`
  gap: 24px;
`;
