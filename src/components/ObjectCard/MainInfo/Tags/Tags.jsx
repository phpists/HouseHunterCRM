import styled from "styled-components";
import homeIcon from "../../../../assets/images/tag-home.svg";
import doorIcon from "../../../../assets/images/tag-door.svg";
import expandIcon from "../../../../assets/images/tag-expanded.svg";
import stairsIcon from "../../../../assets/images/tag-stairs.svg";
import boxIcon from "../../../../assets/images/tag-box-select.svg";
import brickIcon from "../../../../assets/images/tag-brick.svg";
import { Tag } from "./Tag";

export const Tags = ({ data }) => {
  const TAGS = [
    { title: data?.rubric_name },
    {
      title: `${data?.location_name} ${
        data?.street?.length > 0 ? `/ ${data?.street}` : ""
      }`,
      icon: homeIcon,
    },
    ...(data?.rooms > 0
      ? [{ title: `${data?.rooms} кімнати`, icon: doorIcon }]
      : []),
    ...(data?.area_total > 0
      ? [{ title: `${data?.area_total} м²`, icon: expandIcon }]
      : []),
    ...(data?.address_storey > 0
      ? [{ title: `${data?.address_storey}`, icon: stairsIcon }]
      : []),
    ...(data.area_plot_sotka > 0
      ? [{ title: `${data?.area_plot_sotka} соток`, icon: boxIcon }]
      : []),
    // { title: "Купівля-продаж" },
    // { title: "Хрущьовка", icon: homeIcon },
    // { title: "Цегла", icon: brickIcon },
  ];

  return (
    <StyledTags className="flex flex-wrap hide-scroll clickable">
      {TAGS.map(({ title, icon }, i) => (
        <Tag key={i} title={title} icon={icon} />
      ))}
    </StyledTags>
  );
};

const StyledTags = styled.div`
  gap: 4px;
  width: 200px;
  max-height: 140px;
  overflow: auto;
`;
