import styled from "styled-components";
import homeIcon from "../../../../assets/images/tag-home.svg";
import doorIcon from "../../../../assets/images/tag-door.svg";
import expandIcon from "../../../../assets/images/tag-expanded.svg";
import stairsIcon from "../../../../assets/images/tag-stairs.svg";
import boxIcon from "../../../../assets/images/tag-box-select.svg";
import brickIcon from "../../../../assets/images/tag-brick.svg";
import { Tag } from "./Tag";

export const Tags = () => {
  const TAGS = [
    { title: "Оренда комерційної нерухомості" },
    { title: "Львів - Личаківській район ", icon: homeIcon },
    { title: "2 кімнати", icon: doorIcon },
    { title: "108 м²", icon: expandIcon },
    { title: "8 з 18", icon: stairsIcon },
    { title: "108 м²", icon: boxIcon },
    { title: "Купівля-продаж" },
    { title: "Хрущьовка", icon: homeIcon },
    { title: "Цегла", icon: brickIcon },
  ];

  return (
    <StyledTags className="flex flex-wrap hide-scroll">
      {TAGS.map(({ title, icon }, i) => (
        <Tag key={i} title={title} icon={icon} />
      ))}
    </StyledTags>
  );
};

const StyledTags = styled.div`
  gap: 4px;
  width: 200px;
  height: 140px;
  overflow: auto;
`;
