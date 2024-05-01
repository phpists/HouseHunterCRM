import styled from "styled-components";
import { StatisticCard } from "./StatisticCard/StatisticCard";
import userCheckIcon from "../../../../../assets/images/user-check-gradient.svg";
import gramaphonIcon from "../../../../../assets/images/statistic-gramophon.svg";
import homeIcon from "../../../../../assets/images/statistic-home.svg";
import { Divider } from "./Divider";

export const Statistic = ({ onClick, statisticData }) => (
  <StyledStatistic onClick={onClick}>
    <StatisticCard
      title={statisticData?.count_clients ?? "0"}
      subtitle="Всього клієнтів "
      icon={userCheckIcon}
      iconBg="rgba(46, 245, 198, 0.10)"
      infoData={[
        {
          title: "З запитами",
          value: statisticData?.count_client_request ?? "0",
        },
        {
          title: "З об’єктами",
          value: statisticData?.count_client_object ?? "0",
        },
        {
          title: "З запитами і об’єктами",
          value: statisticData?.count_client_object_and_request ?? "0",
        },
        {
          title: "Без запитів і об’єктів",
          value: statisticData?.count_not_object_and_request ?? "0",
        },
        {
          title: "Видалені",
          value: statisticData?.count_deleted_client ?? "0",
        },
      ]}
    />
    <Divider />
    <StatisticCard
      title={statisticData?.count_request ?? "0"}
      subtitle="Всього запитів "
      icon={gramaphonIcon}
      iconBg="rgba(68, 172, 238, 0.10)"
      infoData={[
        {
          title: "Актуальні",
          value: statisticData?.count_request_actual ?? "0",
        },
        {
          title: "Не актуальні",
          value: statisticData?.count_request_not_actual ?? "0",
        },
        { title: "", value: "" },
        {
          title: "Протерміновані",
          value: statisticData?.count_request_overdue ?? "0",
        },
        {
          title: "Видалені",
          value: statisticData?.count_request_deleted ?? "0",
        },
      ]}
    />
    <Divider />
    <StatisticCard
      title={statisticData?.count_objects ?? "0"}
      subtitle="Всього об'єктів "
      icon={homeIcon}
      iconBg="gba(145, 111, 245, 0.10)"
      infoData={[
        {
          title: "Актуальні",
          value: statisticData?.count_objects_actual ?? "0",
        },
        {
          title: "Здані",
          value: statisticData?.count_objects_surrendered ?? "0",
        },
        {
          title: "Об’єкти Street Base",
          value: statisticData?.count_objects_street_base ?? "0",
        },
        {
          title: "Протерміновані",
          value: statisticData?.count_objects_overdue ?? "0",
        },
        {
          title: "Не актуальні",
          value: statisticData?.count_objects_not_actual ?? "0",
        },
        {
          title: "Видалені",
          value: statisticData?.count_objects_deleted ?? "0",
        },
      ]}
    />
  </StyledStatistic>
);

const StyledStatistic = styled.div`
  padding: 10px;
  border-radius: 10px;
  background: var(--bg-80);
  display: flex;
  margin-right: 10px;
  height: 224px;
  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    height: auto;
    gap: 18px;
    margin: 0;
  }
`;
