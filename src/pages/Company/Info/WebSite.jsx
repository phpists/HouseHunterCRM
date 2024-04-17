import { styled } from "styled-components";
import { ReactComponent as WebsiteIcon } from "../../../assets/images/website.svg";
import editIcon from "../../../assets/images/edit-company.svg";
import { useState } from "react";
import saveIcon from "../../../assets/images/check.svg";

export const WebSite = ({ webSite, onEdit }) => {
  const [edit, setEdit] = useState(false);

  const handleSave = (e) => {
    const value = e.target.value;
    if (webSite !== value) {
      onEdit(value);
    }
    setEdit(false);
  };

  return (
    <StyledWebSite className="flex items-end" onClick={() => setEdit(true)}>
      <WebsiteIcon />
      {edit ? (
        <input
          type="text"
          defaultValue={webSite}
          placeholder="Введіть значення вебсайту"
          onBlur={handleSave}
          autoFocus
          onKeyDown={(e) => e?.keyCode === 13 && handleSave(e, true)}
        />
      ) : (
        <span title={webSite}>
          {webSite?.length > 0 ? webSite : "Введіть значення вебсайту"}
        </span>
      )}

      <img
        src={edit ? saveIcon : editIcon}
        alt=""
        onClick={() => setEdit(true)}
      />
    </StyledWebSite>
  );
};

const StyledWebSite = styled.div`
  padding: 10px 11px 9px;
  color: rgba(255, 255, 255, 0.4);
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  width: 50%;
  transition: all 0.3s;
  flex-shrink: 0;
  cursor: pointer;
  position: relative;
  span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 250px;
  }
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
  input {
    width: 90%;
  }
  &:hover {
    color: #fff;
    background: rgba(93, 99, 255, 0.1);
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
    justify-content: start;
    width: 100%;
    padding: 8px 11px;
  }
`;
