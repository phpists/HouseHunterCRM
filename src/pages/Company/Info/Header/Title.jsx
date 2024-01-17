import { styled } from "styled-components";
import editIcon from "../../../../assets/images/edit-company.svg";
import { useState } from "react";

export const Title = ({ title }) => {
  const [edit, setEdit] = useState(false);

  return (
    <StyledTitle
      className="flex items-center"
      //   onClick={() => setEdit(true)}
      edit={edit}
    >
      {edit ? (
        <input
          type="text"
          defaultValue={title}
          autoFocus
          onBlur={() => setEdit(false)}
        />
      ) : (
        title
      )}
      <img src={editIcon} alt="" />
    </StyledTitle>
  );
};

const StyledTitle = styled.h3`
  color: #fff;
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
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
    background: rgba(255, 255, 255, 0.1);
    img {
      opacity: 1;
      visibility: visible;
      transform: translateX(0px);
    }
  }
  ${({ edit }) =>
    edit &&
    `
     background: rgba(255, 255, 255, 0.1);
    img {
      opacity: 1;
      visibility: visible;
      transform: translateX(0px);
    }
    
  `}
`;
