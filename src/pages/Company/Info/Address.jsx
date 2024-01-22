import { styled } from "styled-components";
import { ReactComponent as LocationIcon } from "../../../assets/images/location.svg";
import editIcon from "../../../assets/images/edit-company.svg";
import { useState } from "react";

export const Address = ({ address, onEdit }) => {
  const [edit, setEdit] = useState(false);

  const handleSave = (e) => {
    const value = e.target.value;
    if (address !== value && value?.length > 0) {
      onEdit(value);
    }
    setEdit(false);
  };

  return (
    <StyledAddress className="flex items-end">
      <LocationIcon />
      {edit ? (
        <input
          type="text"
          defaultValue={address}
          placeholder="Введіть значення"
          onBlur={handleSave}
        />
      ) : (
        <span>{address?.length > 0 ? address : "-"}</span>
      )}
      <img src={editIcon} alt="" onClick={() => setEdit(true)} />
    </StyledAddress>
  );
};

const StyledAddress = styled.div`
  padding: 10px 11px 9px;
  background: #2a2a2a;
  color: rgba(255, 255, 255, 0.4);
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  width: 100%;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  svg {
    margin-right: 7px;
  }
  g {
    transition: all 0.3s;
  }
  img {
    transition: all 0.3s;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 9px;
    right: 9px;
    transform: translateX(-10px);
  }
  &:hover {
    color: #fff;
    g {
      opacity: 1;
    }
    img {
      opacity: 1;
      visibility: visible;
      transform: translateX(0px);
    }
  }
  @media (max-width: 600px) {
    padding: 8px 11px;
  }
`;
