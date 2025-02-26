import styled from "styled-components";
import { ReactComponent as Home } from "../../../../assets/images/tag-home.svg";
import { Tag } from "./Tag";
import {
  useGetLocationsQuery,
  useGetRubricsQuery,
} from "../../../../store/requests/requests.api";

export const Tags = ({ data, ad }) => {
  const { data: locationsList } = useGetLocationsQuery();
  const { data: rubricsList } = useGetRubricsQuery();

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
    ...(data?.tag_faster && data?.tag_faster === "1"
      ? [{ title: "Терміново" }]
      : []),
    ...(data?.tag_nativePaint && data?.tag_nativePaint === "1"
      ? [{ title: "Рідна фарба" }]
      : []),
    ...(data?.tag_exchangePossible && data?.tag_exchangePossible === "1"
      ? [{ title: "Можливий обмін" }]
      : []),
    ...(data?.tag_freshlyDriven && data?.tag_freshlyDriven === "1"
      ? [{ title: "Свіжопригнана" }]
      : []),
    ...(data?.tag_afterDTP && data?.tag_afterDTP === "1"
      ? [{ title: "Після дтп" }]
      : []),
    ...(data?.tag_market_bottom && data?.tag_market_bottom === "1"
      ? [{ title: "По низу ринку" }]
      : []),
    ...(data?.tag_market_bottom &&
    data?.tag_price_dump !== "0" &&
    new Date(Number(data?.tag_price_dump) * 1000) >= new Date().getTime()
      ? [{ title: "Ціна сиплеться" }]
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
