import styled from "styled-components";
import doorIcon from "../../../../../../assets/images/tag-door.svg";
import expendIcon from "../../../../../../assets/images/tag-expanded.svg";
import stairsIcon from "../../../../../../assets/images/tag-stairs.svg";
import homeIcon from "../../../../../../assets/images/tag-home.svg";
import childIcon from "../../../../../../assets/images/tag-child.svg";
import petIcon from "../../../../../../assets/images/tag-pet.svg";
import { Tag } from "./Tag";

export const Tags = () => {
  const TAGS = [
    { title: "від 1 до 3", icon: doorIcon },
    { title: "від 50 м²", icon: expendIcon },
    { title: "від 5 до 8", icon: stairsIcon },
    { title: "Хрущьовка", icon: homeIcon },
    { title: "Діти", icon: childIcon },
    { title: "Тварини", icon: petIcon },
  ];

  return (
    <StyledTags className="flex flex-wrap items-center clickable">
      {TAGS.map(({ title, icon }, i) => (
        <Tag key={i} title={title} icon={icon} />
      ))}
    </StyledTags>
  );
};

const StyledTags = styled.div`
  gap: 4px;
`;
