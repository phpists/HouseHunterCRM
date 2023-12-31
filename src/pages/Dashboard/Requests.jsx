import styled from "styled-components";
import { CardHeader } from "./CardHeader";
import { Card } from "./Card/Card";
import { ReactComponent as MegaphoneIcon } from "../../assets/images/megaphone-gradient.svg";
import { InfoList } from "./InfoList/InfoList";
import {
  useGetActualRequestCountQuery,
  useGetOverdueRequestCountQuery,
  useGetRequestsCountQuery,
} from "../../store/requests/requests.api";

export const Requests = () => {
  const { data: requestsCount } = useGetRequestsCountQuery();
  const { data: actualRequestsCount } = useGetActualRequestCountQuery();
  const { data: overdueRequestsCount } = useGetOverdueRequestCountQuery();

  return (
    <StyledRequests>
      <CardHeader title="До моїх запитів" />
      <div className="content">
        <Card
          IconImg={MegaphoneIcon}
          title={requestsCount?.count ?? "-"}
          subtitle="Всього запитів "
        />
        <InfoList
          items={[
            { title: "Актуальні", value: actualRequestsCount?.count ?? "-" },
            {
              title: "Протерміновані",
              value: overdueRequestsCount?.count ?? "-",
            },
          ]}
        />
      </div>
    </StyledRequests>
  );
};

const StyledRequests = styled.div`
  padding: 20px;
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  .content {
    padding: 14px;
    border-radius: 9px;
    background: #3d3d3d;
    .icon-wrapper {
      background: rgba(68, 172, 238, 0.1);
    }
  }
`;
