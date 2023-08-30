import { useState } from "react";
import { styled } from "styled-components";
import { ReactComponent as EditIcon } from "../assets/images/edit-company.svg";
import { ReactComponent as CheckIcon } from "../assets/images/check.svg";

export const Field = ({ value, label, className, hide, textarea }) => {
  const [edit, setEdit] = useState(false);

  return (
    <StyleField
      className={`flex items-center justify-between ${className}`}
      edit={edit}
      hide={hide}
    >
      <div className="field-content">
        {edit ? (
          <>
            {textarea ? (
              <textarea type="text" className="value" defaultValue={value} />
            ) : (
              <input type="text" className="value" defaultValue={value} />
            )}
          </>
        ) : (
          <div className="value">{value}</div>
        )}
        <div className="label">{edit ? "Редагування" : label}</div>
      </div>
      <div
        className="edit-btn flex items-center justify-center"
        onClick={() => setEdit(!edit)}
      >
        {edit ? <CheckIcon /> : <EditIcon className="edit-icon" />}
      </div>
    </StyleField>
  );
};

const StyleField = styled.div`
  width: 100%;
  padding: 7px 10px 6px;
  border-radius: 9px;
  transition: all 0.3s;
  flex-shrink: 0;
  .field-content {
    width: 100%;
  }
  .value {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    width: 100%;
    ${({ hide }) => hide && "filter: blur(3px);"}
  }
  .label {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  .edit-btn {
    opacity: 0.4;
    border-radius: 8px;
    width: 32px;
    transition: all 0.3s;
    height: 32px;
    cursor: pointer;
    margin-left: 10px;
    flex-shrink: 0;
    ${({ edit }) => !edit && " opacity: 0; transform: translateX(-10px);"}
    &:hover {
      background: rgba(255, 255, 255, 0.2) !important;
      opacity: 1 !important;
    }
  }
  .edit-icon {
    path {
      fill: #fff !important;
    }
  }
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    .value {
      filter: blur(0px);
    }
    .edit-btn {
      opacity: 0.4;
      transform: translateX(0px);
    }
  }
  textarea {
    resize: none;
  }
  ${({ edit }) =>
    edit &&
    `
        border-radius: 9px;
        border: 1px solid rgba(255, 255, 255, 0.20);
        background: rgba(255, 255, 255, 0.05);
        .value {
            filter: blur(0px);
        }
  `}
`;
