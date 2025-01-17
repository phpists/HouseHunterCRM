import styled from "styled-components";
import { SubmitButton } from "./SubmitButton";
import { OutlineButton } from "./OutlineButton";
import { ReactComponent as RemoveIcon } from "../../../../assets/images/remove.svg";
import { IconButton } from "../../../IconButton";

export const Actions = ({ onSubmit, loading, disabled, onEdit }) => (
  <StyledActions className="flex items-center">
    <SubmitButton onClick={onSubmit} loading={loading} disabled={disabled} />
    {onEdit && (
      <OutlineButton
        title="Редагувати автомобіль"
        disabled={loading}
        onClick={onEdit}
      />
    )}
    {/* <OutlineButton title="Зупинити" disabled={loading} />
    <IconButton Icon={RemoveIcon} onClick={() => null} className="icon-btn" /> */}
  </StyledActions>
);

const StyledActions = styled.div`
  gap: 10px;
  .icon-btn {
    height: 38px;
    width: 38px;
  }
  @media (max-width: 800px) {
    width: 100%;
    button {
      width: 100%;
    }
  }
  @media (max-width: 500px) {
    flex-direction: column;
    button {
      width: 100%;
    }
  }
`;
