import styled from "styled-components";
import { Title } from "./Title";
import { Tag } from "./Tag";
import { Comments } from "./Comments";
import { ReactComponent as Arrow } from "../../../../../assets/images/welcome-step-arrow.svg";
import { CopyLink } from "../../../../../components/CopyLink";
import { useNavigate } from "react-router-dom";
import { OpenButton } from "./OpenButton";
import { MoreButton } from "../../../../../components/MoreButton/MoreButton";
import { Tags } from "./Tags/Tags";
import { useEffect, useState } from "react";

export const Objects = ({
  data,
  id,
  onOpenChat,
  onToggleFavorite,
  onDelete,
  isNew,
}) => {
  const navigate = useNavigate();

  return (
    <StyledObjects>
      {/* <LastSeen /> */}
      <div className="flex items-center justify-between">
        <div>
          <Tags data={data} />
          <Tag count={data?.count_object} />
        </div>
        <div className="bts flex items-center">
          <OpenButton onClick={() => navigate(`/selections/${id}`)} />
          <CopyLink
            className="copy-btn"
            link={`https://selection.house-hunter.info/?id=${id}`}
          />
          <Comments onOpenChat={onOpenChat} isNew={data?.new_messege === "1"} />
        </div>

        <MoreButton
          onDelete={onDelete}
          onFavorite={onToggleFavorite}
          editLink={`/#/edit-request/${data?.client_hash}/${id}`}
          className="more-btn"
          favorite={data?.favorite}
        />
        <div></div>
      </div>
    </StyledObjects>
  );
};

const StyledObjects = styled.div`
  padding: 10px 40px 10px 10px;
  border-radius: 9px;
  background: #363636;
  position: relative;
  cursor: pointer;
  .bts {
    margin-left: 10px;
  }
  .arrow-main {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 25px;
    height: 25px;
    path {
      transition: all 0.3s;
    }
  }
  &:hover {
    .arrow-main {
      path {
        fill-opacity: 1;
      }
    }
  }
  .copy-btn {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.18);
    transition: all 0.3s;
    margin-right: 4px;
    padding: 4px;
  }
  .more-btn {
    opacity: 1;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    .divider {
      display: none;
    }
  }
  @media (max-width: 1100px) {
    .arrow-main {
      display: none;
    }
  }
  @media (max-width: 900px) {
    .bts {
      margin-left: 8px;
    }
  }
`;
