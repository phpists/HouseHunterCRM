import styled from "styled-components";
import { ObjectCard } from "../../../../components/ObjectCard";
import { Title } from "./Title";
import { Price } from "./Price";
import { CreatedDate } from "./CreatedDate";
import { Tag } from "./Tag";
import { StepNumber } from "../../../../components/StepNumber";
import { MoreButton } from "../../../../components/MoreButton/MoreButton";
import { handleFormatDate } from "../../../../utilits";
import { Label } from "./Label";
import { useParams } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "../../../../assets/images/clients-arrow.svg";

export const DesktopContent = ({
  date,
  title,
  location,
  price,
  onFavorite,
  favorite,
  onDelete,
  isObject,
  id,
  isEdit,
  isDelete,
  currency,
  price_for,
  dateTo,
  isDeleted,
  onRestore,
  onDeleteFinally,
  onDownload,
}) => {
  const { id: clientId } = useParams();

  return (
    <StyledDesktopContent className="flex items-center justify-between">
      <div className="flex items-center w-max">
        <ObjectCard className="object-card" date={date} isObject={isObject} />
        <div className="w-max mr-5">
          <div className="flex items-center w-max">
            <Title title={title} />
            <Price price={price} currency={currency} price_for={price_for} />
          </div>
          <CreatedDate date={date} dateTo={dateTo} isDeleted={isDeleted} />
        </div>
        <div className="w-max mr-5">
          <div className="flex items-center w-max">
            <Title title={location} className="location" />
            {/* <Tag /> */}
          </div>
          <Label label="Локація" />
        </div>
      </div>
      <div className="flex items-center">
        <div className="relative flex items-center">
          {/* <StepNumber num={1} className="number" /> */}
          <MoreButton
            onFavorite={onFavorite}
            favorite={favorite}
            onDelete={onDelete}
            editLink={
              !isEdit
                ? null
                : isObject
                ? `/edit-object/${clientId}/${id}`
                : `/edit-request/${clientId}/${id}`
            }
            noDelete={!isDelete}
            isDeleted={isDeleted}
            onRestore={onRestore}
            onDeleteFinally={onDeleteFinally}
            onDownload={onDownload}
          />
          <button className="arrow-more openMore">
            <ArrowIcon className="openMore" />
          </button>
        </div>
      </div>
    </StyledDesktopContent>
  );
};

const StyledDesktopContent = styled.div`
  .object-card {
    width: 62px;
    height: 62px;
    border-radius: 9px;
    background: var(--modal-bg);
    margin-right: 12px;
    img {
      height: 21px;
      width: 21px;
    }
    span {
      margin-top: 6px;
    }
  }
  .comment-card {
    margin-right: 21px;
  }
  .more {
    opacity: 1;
    margin-left: 12px;
    transform: translateX(0px);
    /* button {
      border: none;
      width: 18px;
      height: 18px;
      background: none;
    } */
    /* .divider {
      display: none;
    } */
  }
  .location {
    max-width: 300px;
    width: 15svw;
    @media (max-width: 1600px) {
      max-width: 150px;
    }
  }
  .number {
    transition: all 0.3s;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;
