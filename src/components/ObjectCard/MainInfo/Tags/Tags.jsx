import styled from "styled-components";
import { ReactComponent as Home } from "../../../../assets/images/tag-home.svg";
import { ReactComponent as Door } from "../../../../assets/images/tag-door.svg";
import { ReactComponent as Expand } from "../../../../assets/images/tag-expanded.svg";
import { ReactComponent as Stairs } from "../../../../assets/images/tag-stairs.svg";
import { ReactComponent as Box } from "../../../../assets/images/tag-box-select.svg";
import { ReactComponent as Rocket } from "../../../../assets/images/BiRocket.svg";
import brickIcon from "../../../../assets/images/tag-brick.svg";
import { Tag } from "./Tag";
import {
  handleFormatDate,
  handleGetLocationAllPath,
} from "../../../../utilits";
import {
  useGetLocationsQuery,
  useGetRubricsQuery,
} from "../../../../store/requests/requests.api";
import { useEffect, useState } from "react";

export const Tags = ({ data, ad }) => {
  const { data: locationsList } = useGetLocationsQuery();
  const { data: rubricsList } = useGetRubricsQuery();

  console.log(data);
  const TAGS = [
    ...(data?.rubric_name && data?.rubric_name?.length > 0
      ? [{ title: data?.rubric_name }]
      : []),
    ...(data?.brand_name && data?.brand_name?.length > 0
      ? [{ title: data?.brand_name }]
      : []),
    ...(data?.model_name && data?.model_name?.length > 0
      ? [{ title: data?.model_name }]
      : []),
    ...(data?.сar_mileage &&
    data?.сar_mileage?.length > 0 &&
    Number(data?.сar_mileage) / 1000 > 0
      ? [{ title: `Пробіг ${Number(data?.сar_mileage) / 1000} тис. км.` }]
      : []),
    ...(data?.year && data?.year?.length > 0 && Number(data?.year) > 0
      ? [{ title: `Рік випуску ${data?.year}р` }]
      : []),
    ...(data?.volume_engine &&
    data?.volume_engine?.length > 0 &&
    Number(data?.volume_engine) / 1000 > 0
      ? [{ title: `Об'єм ${Number(data?.volume_engine) / 1000} л.` }]
      : []),
    // ...(data.liquidity === "1" ? [{ title: `Ліквідно` }] : []),

    ...(ad && rubricsList?.find((r) => r.id === data?.id_rubric)?.name
      ? [{ title: rubricsList?.find((r) => r.id === data?.id_rubric)?.name }]
      : []),
    ...(data?.location_name && data?.location_name?.length > 0
      ? [
          {
            title: `${data?.location_name}`,
            Icon: <Home />,
          },
        ]
      : []),
    ...(locationsList &&
    Object.entries(locationsList)?.find(
      (l) => l?.[1]?.id === data?.id_location
    )?.[1]?.name &&
    ad
      ? [
          {
            title: `${
              Object.entries(locationsList)?.find(
                (l) => l?.[1]?.id === data?.id_location
              )?.[1]?.name
            }`,
            Icon: <Home />,
          },
        ]
      : []),
    ...(data?.street?.length > 0 ? [{ title: `вул. ${data?.street}` }] : []),
    // ...(data?.rooms > 0
    //   ? [{ title: `${data?.rooms} кімнати`, Icon: <Door /> }]
    //   : []),
    // ...(data?.area_total > 0
    //   ? [{ title: `${data?.area_total} м²`, Icon: <Expand /> }]
    //   : []),
    // ...(data?.storey_count !== "0" || data?.address_storey !== "0"
    //   ? [
    //       {
    //         title: `${
    //           data?.address_storey === "0" ? "-" : data?.address_storey
    //         } / ${data?.storey_count === "0" ? "-" : data?.storey_count}`,
    //         Icon: <Stairs />,
    //         hoverTitle: `${data?.address_storey} поверх / ${data?.storey_count} поверховість`,
    //       },
    //     ]
    //   : Number(data?.address_storey) && data?.address_storey?.length > 0
    //   ? [
    //       {
    //         title: `${data?.address_storey}`,
    //         Icon: <Stairs />,
    //         hoverTitle: `${data?.address_storey} поверх`,
    //       },
    //     ]
    //   : []),
    // ...(data.area_plot_sotka > 0
    //   ? [{ title: `${data?.area_plot_sotka} соток`, Icon: <Box /> }]
    //   : []),
    // ...(data.area_kitchen > 0
    //   ? [{ title: `${data?.area_kitchen} м² кухні`, Icon: <Expand /> }]
    //   : []),
    // ...(ad
    //   ? [
    //       {
    //         title: `рекламується з ${handleFormatDate(
    //           Number(data?.dt_publicate) * 1000,
    //           true
    //         )}`,
    //         Icon: <Rocket />,
    //       },
    //     ]
    //   : []),
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
