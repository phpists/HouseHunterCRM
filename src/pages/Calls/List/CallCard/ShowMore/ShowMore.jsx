import styled from "styled-components";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";
import { useRef, useState } from "react";

export const ShowMore = ({
  status,
  onSetStatus,
  onEditComment,
  onAdd,
  onSend,
  onSendCall,
  clientId,
  telegram,
  downloadLink,
  idObject,
  xcorp,
}) => {
  const [isFocusedBtn, setIsFocusedBtn] = useState(false);
  const moreRef = useRef(null);

  const handleCloseDropdown = () => moreRef.current.blur();

  return (
    <StyledShowMore isfocusedbtn={isFocusedBtn?.toString()} ref={moreRef}>
      <Button onChangeFocus={(val) => setIsFocusedBtn(val)} />
      <Dropdown
        status={status}
        onSetStatus={onSetStatus}
        onEditComment={onEditComment}
        onAdd={onAdd}
        onSend={onSend}
        onCloseDropdown={handleCloseDropdown}
        onSendCall={onSendCall}
        clientId={clientId}
        telegram={telegram}
        downloadLink={downloadLink}
        idObject={idObject}
        xcorp={xcorp}
      />
    </StyledShowMore>
  );
};

const StyledShowMore = styled.button`
  margin-top: 15px;
  position: relative;
  ${({ isfocusedbtn }) =>
    isfocusedbtn === "true" &&
    `
   .dropdown {
      opacity: 1;
      visibility: visible;
    }
`}
  &:focus  .dropdown {
    opacity: 1;
    visibility: visible;
  }

  @media (max-width: 1399.9px) {
    position: absolute;
    top: 5px;
    right: 5px;
  }
`;
