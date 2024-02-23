import styled from "styled-components";
import { CardHeader } from "../CardHeader";
import { Card } from "../Card/Card";
import { ReactComponent as HomeIcon } from "../../../assets/images/home-gradient.svg";
import { InfoList } from "../InfoList/InfoList";
import {
  useGetActualObjectsCountQuery,
  useGetObjectsCountQuery,
  useGetOverdueObjectsCountQuery,
  useGetStreetBaseObjectsCountQuery,
} from "../../../store/objects/objects.api";

export const Objects = ({ statisticData }) => {
  const { data: objectCount } = useGetObjectsCountQuery();
  const { data: actualObjectCount } = useGetActualObjectsCountQuery();
  const { data: overdueObjectCount } = useGetOverdueObjectsCountQuery();
  const { data: streetBaseObjectCount } = useGetStreetBaseObjectsCountQuery();

  return (
    <StyledObjects>
      <CardHeader title="До моїх об’єктів" link="/objects?my_objects=true" />
      <div className="content">
        <Card
          IconImg={HomeIcon}
          title={objectCount?.count}
          subtitle="Всього об'єктів "
        />
        <InfoList
          items={[
            {
              title: "Протерміновані",
              value: overdueObjectCount?.count ?? "-",
            },
            {
              title: "Об’єкти Street Base",
              value: streetBaseObjectCount?.count ?? "-",
            },
            { title: "Актуальні", value: actualObjectCount?.count ?? "-" },
            {
              title: "Не актуальні",
              value: statisticData?.count_objects_not_actual ?? "0",
            },
            {
              title: "Здані",
              value: statisticData?.count_objects_surrendered ?? "0",
            },
          ]}
        />
      </div>
    </StyledObjects>
  );
};

const StyledObjects = styled.div`
  padding: 10px;
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  margin-bottom: 10px;
  .content {
    padding: 14px;
    border-radius: 9px;
    background: #3d3d3d;
    .icon-wrapper {
      background: rgba(145, 111, 245, 0.1);
    }
  }
  @media (max-width: 1100px) {
    margin-bottom: 10px;
  }
`;
