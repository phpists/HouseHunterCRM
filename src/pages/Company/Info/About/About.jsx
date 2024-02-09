import { styled } from "styled-components";
import { Title } from "./Title";
import { Description } from "./Description";
import editIcon from "../../../../assets/images/edit-company.svg";
import { useState } from "react";
import checkIcon from "../../../../assets/images/check.svg";

export const About = ({ value, onChange }) => {
  const [edit, setEdit] = useState(false);

  return (
    <StyledAbout
      className="hover-effect-to-right"
      onClick={() => !edit && setEdit(!edit)}
    >
      <img
        src={edit ? checkIcon : editIcon}
        alt=""
        className={edit && "edit"}
        onClick={() => setEdit(false)}
      />
      <Title />
      <Description
        value={value}
        onChange={onChange}
        onCloseEdit={() => setEdit(false)}
        edit={edit}
      />
    </StyledAbout>
  );
};

const StyledAbout = styled.div`
  margin-bottom: 16px;
  padding: 11px 20px 10px 11px;
  border-radius: 13px;
  cursor: pointer;
  position: relative;
  img {
    position: absolute;
    top: 10px;
    right: 10px;
    transform: translateX(-5px);
    opacity: 0;
    transition: all 0.3s;
    visibility: hidden;
    width: 17px;
  }
  .edit {
    visibility: visible;
    opacity: 1;
  }
  &:hover {
    img {
      opacity: 1;
      transition: all 0.3s;
      visibility: visible;
      transform: translateX(0px);
    }
  }
`;
