import { styled } from "styled-components";
import editIcon from "../assets/images/edit-company.svg";
import { useEffect, useState } from "react";
import { useLazyEditClientCommentQuery } from "../store/clients/clients.api";
import cogoToast from "cogo-toast";
import { handleResponse } from "../utilits";

export const Comment = ({ className, comment, id }) => {
  const [commentValue, setCommentValue] = useState(comment ?? "");
  const [edit, setEdit] = useState(false);
  const [editComment] = useLazyEditClientCommentQuery();

  useEffect(() => {
    setCommentValue(comment);
  }, [comment]);

  const handleSave = (e) => {
    const value = e.target.value;
    setEdit(false);
    if (value !== comment) {
      editComment({
        id_client: id,
        comment: value,
      }).then((resp) => {
        handleResponse(resp, () => {
          setCommentValue(value);
          cogoToast.success("Зміни успішно збережено", {
            hideAfter: 3,
            position: "top-right",
          });
        });
      });
    }
  };

  return (
    <StyledComment className={`flex items-start ${className}`}>
      <div>
        {edit ? (
          <input
            type="text"
            className="value"
            autoFocus
            onBlur={handleSave}
            onKeyDown={(e) => e?.keyCode === 13 && handleSave(e)}
            defaultValue={commentValue}
          />
        ) : (
          <div className="value" onClick={() => setEdit(true)}>
            {commentValue?.length > 0 ? commentValue : "-"}
          </div>
        )}
        <div className="label" onClick={() => setEdit(true)}>
          Коментар
        </div>
      </div>
      <img src={editIcon} alt="" onClick={() => setEdit(true)} />
    </StyledComment>
  );
};

const StyledComment = styled.div`
  padding: 6px 6px 6px 8px;
  border-radius: 6px;
  background: #444;
  transition: all 0.3s;
  color: #fff;
  cursor: pointer;
  flex-shrink: 0;
  .value {
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
    min-height: 10px;
    max-width: 120px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .label {
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  img {
    margin-left: 17px;
    transform: translateX(-5px);
    opacity: 0;
    transition: all 0.3s;
  }
  &:hover {
    background: #535252;
    img {
      transform: translateX(0px);
      opacity: 1;
    }
  }
`;
