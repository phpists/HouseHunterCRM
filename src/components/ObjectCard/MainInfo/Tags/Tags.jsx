import styled from "styled-components";
import { ReactComponent as Home } from "../../../../assets/images/tag-home.svg";
import { ReactComponent as Door } from "../../../../assets/images/tag-door.svg";
import { ReactComponent as Expand } from "../../../../assets/images/tag-expanded.svg";
import { ReactComponent as Stairs } from "../../../../assets/images/tag-stairs.svg";
import { ReactComponent as Box } from "../../../../assets/images/tag-box-select.svg";
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
            title: `${data?.location_name}`,
            Icon: <Home />,
          },
        ]
      : []),
    ...(data?.street?.length > 0 ? [{ title: `вул. ${data?.street}` }] : []),
    ...(data?.rooms > 0
      ? [{ title: `${data?.rooms} кімнати`, Icon: <Door /> }]
      : []),
    ...(data?.area_total > 0
      ? [{ title: `${data?.area_total} м²`, Icon: <Expand /> }]
      : []),
    ...(data?.address_storey > 0 &&
    data?.storey_count > 0 &&
    data?.storey_count &&
    data?.address_storey
      ? [
          {
            title: `${data?.address_storey} / ${data?.storey_count}`,
            Icon: <Stairs />,
            hoverTitle: `${data?.address_storey} поверх / ${data?.storey_count} поверховість`,
          },
        ]
      : Number(data?.address_storey) && data?.address_storey?.length > 0
      ? [
          {
            title: `${data?.address_storey}`,
            Icon: <Stairs />,
            hoverTitle: `${data?.address_storey} поверх`,
          },
        ]
      : []),
    ...(data.area_plot_sotka > 0
      ? [{ title: `${data?.area_plot_sotka} соток`, Icon: <Box /> }]
      : []),
    ...(data.area_kitchen > 0
      ? [{ title: `${data?.area_kitchen} м² кухні`, Icon: <Expand /> }]
      : []),
    // { title: "Купівля-продаж" },
    // { title: "Хрущьовка", icon: homeIcon },
    // { title: "Цегла", icon: brickIcon },
  ];

  return (
    <StyledTags className="flex flex-wrap hide-scroll clickable">
      {TAGS.map(({ title, Icon, hoverTitle }, i) => (
        <Tag key={i} title={title} Icon={Icon} hoverTitle={hoverTitle} />
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
