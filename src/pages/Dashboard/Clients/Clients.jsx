import styled from "styled-components";
import { CardHeader } from "../CardHeader";
import { Card } from "../Card/Card";
import { ReactComponent as Users } from "../../../assets/images/users.svg";

export const Clients = () => (
  <StyledClients>
    <CardHeader title="До моїх клієнтів" />
    <Card IconImg={Users} title="1353" subtitle="Всього клієнтів" />
  </StyledClients>
);

const StyledClients = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  path {
    fill: #2df47d;
  }
  @media (max-width: 1100px) {
    margin-bottom: 10px;
  }
`;