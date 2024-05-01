import { useState } from "react";
import { styled } from "styled-components";
import { ReactComponent as EditIcon } from "../../../../assets/images/edit-company.svg";
import { ReactComponent as Checkcon } from "../../../../assets/images/done.svg";

export const Field = ({ value, label }) => {
  const [edit, setEdit] = useState(false);

  return (
    <StyledField
      className={`flex items-center justify-between ${edit && "active"}`}
    >
      <div>
        {edit ? (
          <input type="text" defaultValue={value} className="value" />
        ) : (
          <div className="value">{value}</div>
        )}
        <div className="label">{label}</div>
      </div>
      {edit ? (
        <Checkcon onClick={() => setEdit(false)} />
      ) : (
        <EditIcon onClick={() => setEdit(true)} className="edit-icon" />
      )}
    </StyledField>
  );
};

const StyledField = styled.div`
  border-radius: 9px;
  padding: 7px 17px 7px 7px;
  cursor: pointer;
  transition: all 0.3s;
  .value {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
  .label {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  svg {
    opacity: 0;
    transition: all 0.3s;
    flex-shrink: 0;
    g {
      opacity: 1;
    }
    &:hover {
      opacity: 1 !important;
    }
  }
  .edit-icon path {
    fill: var(--main-color);
  }
  input {
    width: 100%;
  }
  &:hover,
  &.active {
    background: rgba(0, 0, 0, 0.1);
    svg {
      opacity: 0.4;
    }
  }
`;
