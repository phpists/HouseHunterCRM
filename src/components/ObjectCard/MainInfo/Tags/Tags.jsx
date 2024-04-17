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
    ...(data?.rubric_name && data?.rubric_name?.length > 0
      ? [{ title: data?.rubric_name }]
      : []),
    ...(data?.location_name && data?.location_name?.length > 0
      ? [
          {
            title: `${data?.location_name} ${
              data?.street?.length > 0 ? `/ ${data?.street}` : ""
            }`,
            icon: homeIcon,
          },
        ]
      : []),
    ...(data?.rooms > 0
      ? [{ title: `${data?.rooms} кімнати`, icon: doorIcon }]
      : []),
    ...(data?.area_total > 0
      ? [{ title: `${data?.area_total} м²`, icon: expandIcon }]
      : []),
    ...(data?.address_storey > 0 &&
    data?.storey_count > 0 &&
    data?.storey_count &&
    data?.address_storey
      ? [
          {
            title: `${data?.address_storey} / ${data?.storey_count}`,
            icon: stairsIcon,
            hoverTitle: `${data?.address_storey} поверх / ${data?.storey_count} поверховість`,
          },
        ]
      : []),
    ...(data.area_plot_sotka > 0
      ? [{ title: `${data?.area_plot_sotka} соток`, icon: boxIcon }]
      : []),
    ...(data.area_kitchen > 0
      ? [{ title: `${data?.area_kitchen} м² кухні`, icon: expandIcon }]
      : []),
    // { title: "Купівля-продаж" },
    // { title: "Хрущьовка", icon: homeIcon },
    // { title: "Цегла", icon: brickIcon },
  ];

  return (
    <StyledTags className="flex flex-wrap hide-scroll clickable">
      {TAGS.map(({ title, icon, hoverTitle }, i) => (
        <Tag key={i} title={title} icon={icon} hoverTitle={hoverTitle} />
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
