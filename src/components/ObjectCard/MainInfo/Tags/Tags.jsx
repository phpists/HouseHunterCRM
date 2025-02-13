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
    ...(data?.price_change_for_last &&
    data?.price_change_for_last?.length > 0 &&
    Number(data?.price_change_for_last) > 0
      ? [
          {
            title: `Різниця ціни до попередньої ${data?.price_change_for_last}$`,
          },
        ]
      : []),
    ...(data?.price_change_for_first &&
    data?.price_change_for_first?.length > 0 &&
    Number(data?.price_change_for_first) > 0
      ? [{ title: `Різниця ціни до першої ${data?.price_change_for_first}$` }]
      : []),
    ...(data?.index_overbuying &&
    data?.index_overbuying?.length > 0 &&
    Number(data?.index_overbuying) > 0
      ? [{ title: `Індекс перекупа ${data?.index_overbuying}` }]
      : []),

    ...(data?.count_likes &&
    data?.count_likes?.length > 0 &&
    Number(data?.count_likes) > 0
      ? [{ title: `К-сть лайків ${data?.count_likes}` }]
      : []),

    ...(data?.count_views &&
    data?.count_views?.length > 0 &&
    Number(data?.count_views) > 0
      ? [{ title: `К-сть переглядів ${data?.count_views}` }]
      : []),
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
  .title {
    max-width: 200px;
  }
`;
