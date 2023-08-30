import { styled } from "styled-components";
import { ObjectCard } from "../../../../components/ObjectCard";
import { Title } from "./Title";
import { Price } from "./Price";
import { CreatedDate } from "./CreatedDate";
import { Comment } from "../../../../components/Comment";
import { StepNumber } from "../../../../components/StepNumber";
import { MoreButton } from "../../../../components/MoreButton/MoreButton";

export const Card = () => {
  return (
    <StyledCard className="flex items-center justify-between">
      <div className="flex items-center">
        <ObjectCard className="object-card" date="04.10.23" />
        <div>
          <div className="flex items-center">
            <Title />
            <Price />
          </div>
          <CreatedDate />
        </div>
      </div>
      <div className="flex items-center">
        <Comment className="comment-card" />
        <StepNumber num={1} className="number" />
        <MoreButton />
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  padding: 6px 21px 6px 6px;
  border-radius: 14px;
  background: #3d3d3d;
  margin-bottom: 10px;
  cursor: pointer;
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
    width: 0;
  }
  &:hover {
    .more {
      opacity: 1;
      transform: translateX(0px);
      width: 32px;
      .divider {
        display: none;
      }
    }
    .number {
      opacity: 0;
      display: none;
    }
  }
`;
