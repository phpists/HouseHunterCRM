import styled from "styled-components";
import { CardHeader } from "../CardHeader";
import { Card } from "../Card/Card";
import { ReactComponent as Users } from "../../../assets/images/users.svg";

export const Clients = ({ data }) => (
  <StyledClients>
    <CardHeader title="До моїх клієнтів" link="/clients" />
    <Card
      IconImg={Users}
      title={data?.count ?? "-"}
      subtitle="Всього клієнтів"
    />
  </StyledClients>
);

const StyledClients = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background: var(--dark-card-bg);
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  path {
    fill: #2df47d;
  }
  @media (max-width: 1100px) {
    margin-bottom: 10px;
  }
  @media (max-width: 500px) {
    padding: 5px;
  }
`;
