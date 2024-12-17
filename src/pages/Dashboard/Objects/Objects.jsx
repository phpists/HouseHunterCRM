import styled from "styled-components";
import { CardHeader } from "../CardHeader";
import { Card } from "../Card/Card";
import { ReactComponent as HomeIcon } from "../../../assets/images/home-gradient.svg";
import { InfoList } from "../InfoList/InfoList";

export const Objects = ({ statisticData }) => {
  return (
    <StyledObjects>
      {/* <CardHeader title="До моїх машин" link="/objects?my_objects=true" /> */}
      <CardHeader title="До моїх автомобілей" link="/" />
      <div className="content">
        <Card IconImg={HomeIcon} title={"0*"} subtitle="Всього автомобілей " />
        <InfoList
          items={[
            {
              title: "Протерміновані",
              value: statisticData?.count_objects_overdue ?? "-",
            },
            {
              title: "Об’єкти Street Base",
              value: statisticData?.count_objects_street_base ?? "-",
            },
            {
              title: "Актуальні",
              value: statisticData?.count_objects_actual ?? "-",
            },
            {
              title: "Не актуальні",
              value: statisticData?.count_objects_not_actual ?? "0",
            },
            {
              title: "Здані",
              value: statisticData?.count_objects_surrendered ?? "0",
            },
            {
              title: "Видалені",
              value: statisticData?.count_objects_deleted ?? "0",
            },
          ]}
        />
      </div>
    </StyledObjects>
  );
};

const StyledObjects = styled.div`
  padding: 10px;
  background: var(--dark-card-bg);
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  margin-bottom: 10px;
  .content {
    padding: 14px;
    border-radius: 9px;
    background: var(--card-bg);
    .icon-wrapper {
      background: rgba(145, 111, 245, 0.1);
    }
  }
  @media (max-width: 1100px) {
    margin-bottom: 10px;
  }
  @media (max-width: 500px) {
    padding: 5px;
  }
`;
