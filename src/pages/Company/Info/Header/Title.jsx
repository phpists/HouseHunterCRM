import { styled } from "styled-components";
import editIcon from "../../../../assets/images/edit-company.svg";
import { useState } from "react";
import saveIcon from "../../../../assets/images/check.svg";

export const Title = ({ title, onEdit }) => {
  const [edit, setEdit] = useState(false);

  const handleSave = (e) => {
    const value = e.target.value;
    if (title !== value) {
      onEdit("company_name", value);
    }
    setEdit(false);
  };

  return (
    <StyledTitle
      className="flex items-center"
      onClick={() => setEdit(true)}
      edit={edit}
    >
      {edit ? (
        <input
          type="text"
          defaultValue={title}
          autoFocus
          onBlur={handleSave}
          placeholder="Введіть назву"
          onKeyDown={(e) => e?.keyCode === 13 && handleSave(e)}
        />
      ) : title?.length > 0 ? (
        title
      ) : (
        "Введіть назву"
      )}
      <img src={edit ? saveIcon : editIcon} alt="" />
    </StyledTitle>
  );
};

const StyledTitle = styled.h3`
  color: var(--main-color);
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 23.6px */
  letter-spacing: 0.4px;
  margin-bottom: 1px;
  padding: 3px 4px 1px 6px;
  border-radius: 5px;
  transition: all 0.3s;
  cursor: pointer;
  input {
    transition: all 0.3s;
    width: 180px;
  }
  img {
    margin-left: 19px;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s;
    transform: translateX(-5px);
  }
  &:hover {
    background: var(--bg-10);
    img {
      opacity: 1;
      visibility: visible;
      transform: translateX(0px);
    }
  }
  ${({ edit }) =>
    edit &&
    `
     background: var(--bg-10);
    img {
      opacity: 1;
      visibility: visible;
      transform: translateX(0px);
    }
    
  `}
`;
