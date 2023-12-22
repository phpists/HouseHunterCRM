import styled from "styled-components";
import { Button } from "./Button";
import { useState } from "react";
import { AddModal } from "./AddModal";

export const AddButton = ({ onRefresh, objectsIds }) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledAddButton>
      {open && (
        <AddModal
          onClose={() => setOpen(false)}
          onRefresh={onRefresh}
          objectsIds={objectsIds}
        />
      )}
      <Button onClick={() => setOpen(true)} />
    </StyledAddButton>
  );
};

const StyledAddButton = styled.div``;
