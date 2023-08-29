import { styled } from "styled-components";
import { MainInfo } from "./MainInfo/MainInfo";
import { Phones } from "./Phones/Phones";
import { Divider } from "./Divider";
import { PhoneInfo } from "./PhoneInfo";
import { Comment } from "./Comment";
import { Objects } from "./Objects/Objects";
import { More } from "./More/More";
import { Arrow } from "./Arrow";

export const Card = ({ selected, onSelect }) => {
  const handleClick = (e) => {
    e.target.classList.contains("card") && onSelect();
  };

  return (
    <StyledCard
      className="flex items-center justify-between hide-scroll card"
      onClick={handleClick}
      selected={selected}
    >
      <MainInfo />
      <Phones />
      <Divider />
      <PhoneInfo />
      <Divider />
      <Comment />
      <Divider />
      <Objects />
      <More />
      <Arrow />
    </StyledCard>
  );
};

const StyledCard = styled.div`
  padding: 14px;
  border-radius: 10px;
  background: #3d3d3d;
  transition: all 0.3s;
  cursor: pointer;
  min-width: max-content;
  &:hover {
    background: #484848;
    .arrow svg {
      transform: rotate(0deg);
      opacity: 1;
    }
    .more {
      opacity: 1;
      transform: translateX(0px);
    }
  }
  ${({ selected }) => selected && "border: 1.4px solid #FFF;"}
`;
