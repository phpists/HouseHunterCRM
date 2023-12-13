import styled from "styled-components";
import { ObjectCard } from "../../../../components/ObjectCard";
import { Title } from "./Title";
import { Price } from "./Price";
import { CreatedDate } from "./CreatedDate";
import { Tag } from "./Tag";
import { StepNumber } from "../../../../components/StepNumber";
import { MoreButton } from "../../../../components/MoreButton/MoreButton";
import { Label } from "./Label";
import { Divider } from "./Divider";
import { useParams } from "react-router-dom";

export const MobileContent = ({
  date,
  title,
  location,
  price,
  onFavorite,
  favorite,
  onDelete,
  isObject,
  id,
  isDelete,
  isEdit,
}) => {
  const { id: clientId } = useParams();

  return (
    <StyledMobileContent className="flex items-center justify-between w-full">
      <div className="flex items-center w-full">
        <div className="cards-wrapper">
          <ObjectCard className="object-card" date={date} isObject={isObject} />
          {/* <StepNumber num={1} className="number" /> */}
        </div>
        <div className="w-full">
          <div className="w-max mr-5">
            <div className="flex items-center w-max">
              <Title title={title} />
              <Price price={price} />
            </div>
            <CreatedDate date={date} />
          </div>
          <Divider />
          <div className="w-max mr-5">
            <div className="flex items-center w-max">
              <Title title={location} className="location" />
              <Tag />
            </div>
            <Label label="Локація" />
          </div>
        </div>
      </div>
      <div className="flex items-center more-btn-wrapper">
        <div className="relative flex items-center">
          <MoreButton
            onFavorite={onFavorite}
            favorite={favorite}
            onDelete={onDelete}
            editLink={
              !isEdit
                ? null
                : isObject
                ? `/#/edit-object/${clientId}/${id}`
                : `/#/edit-request/${clientId}/${id}`
            }
            noDelete={!isDelete}
          />
        </div>
      </div>
    </StyledMobileContent>
  );
};

const StyledMobileContent = styled.div`
  .cards-wrapper {
    margin-right: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 86px;
  }
  .object-card {
    width: 44px;
    height: 44px;
    border-radius: 9px;
    background: #2b2b2b;
    font-size: 10px;
    margin: 0;
    img {
      height: 14px;
      width: 14px;
    }
    span {
      margin-top: 4px;
    }
  }
  .comment-card {
    margin-right: 21px;
  }
  .more {
    opacity: 1;
    margin-left: 12px;
    transform: translateX(0px);
    button {
      border: none;
      width: 18px;
      height: 18px;
      background: none;
    }
    .divider {
      display: none;
    }
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
    margin: 8px auto 0;
    line-height: 1;
  }

  .more-btn-wrapper {
    margin-left: 8px;
    display: flex;
    align-items: start;
    height: 86px;
    .dropdown {
      top: 0;
    }
  }
  @media (min-width: 700px) {
    display: none;
  }
`;
