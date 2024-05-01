import styled from "styled-components";
import { CardHeader } from "./CardHeader";
import { Card } from "./Card/Card";
import { ReactComponent as MegaphoneIcon } from "../../assets/images/megaphone-gradient.svg";
import { InfoList } from "./InfoList/InfoList";

export const Requests = ({ statisticData }) => {
  return (
    <StyledRequests>
      <CardHeader title="До моїх запитів" link="/requests" />
      <div className="content">
        <Card
          IconImg={MegaphoneIcon}
          title={statisticData?.count_request ?? "-"}
          subtitle="Всього запитів "
        />
        <InfoList
          items={[
            {
              title: "Актуальні",
              value: statisticData?.count_request_actual ?? "-",
            },
            {
              title: "Протерміновані",
              value: statisticData?.count_request_overdue ?? "-",
            },
            {
              title: "Неактуальні ",
              value: statisticData?.count_request_not_actual ?? "0",
            },
            {
              title: "Видалені",
              value: statisticData?.count_request_deleted ?? "0",
            },
          ]}
        />
      </div>
    </StyledRequests>
  );
};

const StyledRequests = styled.div`
  padding: 10px;
  background: var(--dark-card-bg);
  .content {
    padding: 14px;
    border-radius: 9px;
    background: var(--card-bg);
    .icon-wrapper {
      background: rgba(68, 172, 238, 0.1);
    }
  }
  @media (max-width: 500px) {
    padding: 5px;
  }
`;
