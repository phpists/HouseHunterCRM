import { styled } from "styled-components";
import { ObjectCard } from "../../../../components/ObjectCard";
import { Title } from "./Title";
import { Price } from "./Price";
import { CreatedDate } from "./CreatedDate";
import { Comment } from "../../../../components/Comment";
import { StepNumber } from "../../../../components/StepNumber";
import { MoreButton } from "../../../../components/MoreButton/MoreButton";

export const Card = ({ selected, onSelect }) => {
  return (
    <StyledCard
      className="flex items-center justify-between"
      onClick={onSelect}
      selected={selected}
    >
      <div className="flex items-center w-max">
        <ObjectCard className="object-card" date="04.10.23" />
        <div className="w-max">
          <div className="flex items-center w-max">
            <Title />
            <Price />
          </div>
          <CreatedDate />
        </div>
      </div>
      <div className="flex items-center">
        <Comment className="comment-card" />
        <div className="relative">
          <StepNumber num={1} className="number" />
          <MoreButton />
        </div>
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  padding: 6px 21px 6px 6px;
  border-radius: 14px;
  background: #3d3d3d;
  margin-bottom: 10px;
  transition: all 0.3s;
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
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s;
    .divider {
      display: none;
    }
  }
  .number {
    transition: all 0.3s;
  }
  &:hover {
    background: #484848;
    .more {
      opacity: 1;
      left: 50%;
    }
    .number {
      opacity: 0;
      transform: translateX(-10px);
    }
  }

  ${({ selected }) => selected && "border: 1.4px solid #FFF;"}
`;
