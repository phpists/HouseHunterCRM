import styled from "styled-components";
import { ReactComponent as RemoveIcon } from "../../../../assets/images/remove.svg";

export const RemoveButton = ({ onRemove }) => (
  <StyledRemoveButton className="btn noClickable">
    <RemoveIcon onClick={onRemove} className="noClickable" />
  </StyledRemoveButton>
);

const StyledRemoveButton = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  cursor: pointer;
`;
