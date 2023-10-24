import styled from "styled-components";
import doorIcon from "../../../../../../assets/images/tag-door.svg";
import expendIcon from "../../../../../../assets/images/tag-expanded.svg";
import stairsIcon from "../../../../../../assets/images/tag-stairs.svg";
import homeIcon from "../../../../../../assets/images/tag-home.svg";
import childIcon from "../../../../../../assets/images/tag-child.svg";
import petIcon from "../../../../../../assets/images/tag-pet.svg";
import { Tag } from "./Tag";

export const Tags = ({ roomMin, roomMax, areaMin, storeyMin, storeyMax }) => {
  const TAGS = [
    { title: `від ${roomMin} до ${roomMax}`, icon: doorIcon },
    { title: `від ${areaMin} м²`, icon: expendIcon },
    { title: `від ${storeyMin} до ${storeyMax}`, icon: stairsIcon },
    // { title: "Хрущьовка", icon: homeIcon },
    // { title: "Діти", icon: childIcon },
    // { title: "Тварини", icon: petIcon },
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
