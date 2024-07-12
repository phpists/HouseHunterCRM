import styled from "styled-components";
import { SaveButton } from "./SaveButton";
import { IconButton } from "../../../../components/IconButton";
import { ReactComponent as RemoveIcon } from "../../../../assets/images/remove.svg";
import { CreateButton } from "./CreateButton";

export const Actions = ({ selectedTemplate, onCreate }) => {
  return (
    <StyledActions className="flex items-center">
      <CreateButton onClick={onCreate} />
      {selectedTemplate ? (
        <>
          <SaveButton />
          <IconButton Icon={RemoveIcon} className="icon-btn" />
        </>
      ) : null}
    </StyledActions>
  );
};

const StyledActions = styled.div`
  gap: 14px;
`;
