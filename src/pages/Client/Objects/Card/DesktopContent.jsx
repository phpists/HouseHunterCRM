import styled from "styled-components";
import { ObjectCard } from "../../../../components/ObjectCard";
import { Title } from "./Title";
import { Price } from "./Price";
import { CreatedDate } from "./CreatedDate";
import { Tag } from "./Tag";
import { StepNumber } from "../../../../components/StepNumber";
import { MoreButton } from "../../../../components/MoreButton/MoreButton";

export const DesktopContent = () => (
  <StyledDesktopContent className="flex items-center justify-between">
    <div className="flex items-center w-max">
      <ObjectCard className="object-card" date="04.10.23" />
      <div className="w-max mr-5">
        <div className="flex items-center w-max">
          <Title title="Оренда комерційної нерухомості" />
          <Price />
        </div>
        <CreatedDate />
      </div>
      <div className="w-max mr-5">
        <div className="flex items-center w-max">
          <Title
            title="Шевченківський, Галицький, Личаківський"
            className="location"
          />
          <Tag />
        </div>
        <CreatedDate />
      </div>
    </div>
    <div className="flex items-center">
      <div className="relative flex items-center">
        <StepNumber num={1} className="number" />
        <MoreButton />
      </div>
    </div>
  </StyledDesktopContent>
);

const StyledDesktopContent = styled.div`
  .object-card {
    width: 62px;
    height: 62px;
    border-radius: 9px;
    background: #2b2b2b;
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
  }
  @media (max-width: 700px) {
    display: none;
  }
`;
