import styled from "styled-components";
import { Button } from "./Button";
import { ReactComponent as StarIcon } from "../../../../../assets/images/card-star.svg";
import { ReactComponent as EditIcon } from "../../../../../assets/images/edit-company.svg";
import { ReactComponent as RemoveIcon } from "../../../../../assets/images/remove.svg";

export const Actions = () => {
  return (
    <StyledActions>
      <Button Icon={StarIcon} className="mb-2.5" />
      <Button Icon={EditIcon} className="edit-btn mb-2.5" />
      <Button Icon={RemoveIcon} className="remove-btn" />
    </StyledActions>
  );
};

const StyledActions = styled.div`
  .edit-btn {
    path {
      fill: #fff;
      opacity: 0.4;
    }
  }
  .remove-btn {
    &:hover {
      border: 1px solid rgba(255, 101, 101, 0.2);
      path {
        fill: #ff6c6c;
      }
    }
  }
  @media (max-width: 1399.9px) {
    margin-left: 10px;
  }
`;
