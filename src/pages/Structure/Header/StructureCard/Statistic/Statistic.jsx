import styled from "styled-components";
import { StatisticCard } from "./StatisticCard/StatisticCard";
import userCheckIcon from "../../../../../assets/images/user-check-gradient.svg";
import gramaphonIcon from "../../../../../assets/images/statistic-gramophon.svg";
import homeIcon from "../../../../../assets/images/statistic-home.svg";
import { Divider } from "./Divider";

export const Statistic = ({ onClick }) => (
  <StyledStatistic onClick={onClick}>
    <StatisticCard
      title="1353"
      subtitle="Всього клієнтів "
      icon={userCheckIcon}
      iconBg="rgba(46, 245, 198, 0.10)"
      infoData={[
        { title: "З запитами", value: "73" },
        { title: "З об’єктами", value: "62" },
        { title: "З запитами і об’єктами", value: "80" },
        { title: "Без запитів і об’єктів", value: "100" },
        { title: "Видалені", value: "4" },
      ]}
    />
    <Divider />
    <StatisticCard
      title="513"
      subtitle="Всього запитів "
      icon={gramaphonIcon}
      iconBg="rgba(68, 172, 238, 0.10)"
      infoData={[
        { title: "Актуальні", value: "201" },
        { title: "Не актуальні", value: "9" },
        { title: "", value: "" },
        { title: "Протерміновані", value: "17" },
        { title: "Видалені", value: "10" },
      ]}
    />
    <Divider />
    <StatisticCard
      title="423"
      subtitle="Всього об'єктів "
      icon={homeIcon}
      iconBg="gba(145, 111, 245, 0.10)"
      infoData={[
        { title: "Актуальні", value: "200" },
        { title: "Здані", value: "184" },
        { title: "Об’єкти Street Base", value: "1 184" },
        { title: "Протерміновані", value: "1" },
        { title: "Видалені", value: "5" },
      ]}
    />
  </StyledStatistic>
);

const StyledStatistic = styled.div`
  padding: 10px;
  border-radius: 10px;
  background: rgba(50, 50, 50, 0.8);
  display: flex;
  margin-right: 10px;
  height: 224px;
`;
