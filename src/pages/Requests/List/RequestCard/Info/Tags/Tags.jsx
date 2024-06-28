import styled from "styled-components";
import { ReactComponent as DoorsIcon } from "../../../../../../assets/images/tag-door.svg";
import { ReactComponent as ExpandedIcon } from "../../../../../../assets/images/tag-expanded.svg";
import { ReactComponent as StairsIcon } from "../../../../../../assets/images/tag-stairs.svg";
import homeIcon from "../../../../../../assets/images/tag-home.svg";
import childIcon from "../../../../../../assets/images/tag-child.svg";
import petIcon from "../../../../../../assets/images/tag-pet.svg";
import { Tag } from "./Tag";

export const Tags = ({ roomMin, roomMax, areaMin, storeyMin, storeyMax }) => {
  const TAGS = [
    ...(roomMax > 0
      ? [{ title: `від ${roomMin} до ${roomMax}`, Icon: DoorsIcon }]
      : []),
    ...(areaMin > 0
      ? [{ title: `від ${areaMin} м²`, Icon: ExpandedIcon }]
      : []),
    ...(storeyMax > 0
      ? [{ title: `від ${storeyMin} до ${storeyMax}`, Icon: StairsIcon }]
      : []),
    // { title: "Хрущьовка", icon: homeIcon },
    // { title: "Діти", icon: childIcon },
    // { title: "Тварини", icon: petIcon },
  ];

  return (
    <StyledTags className="flex flex-wrap items-center clickable">
      {TAGS.map(({ title, Icon }, i) => (
        <Tag key={i} title={title} Icon={Icon} />
      ))}
    </StyledTags>
  );
};

const StyledTags = styled.div`
  gap: 4px;
`;
