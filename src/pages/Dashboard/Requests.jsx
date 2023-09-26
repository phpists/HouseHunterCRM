import styled from "styled-components";
import { CardHeader } from "./CardHeader";
import { Card } from "./Card/Card";
import { ReactComponent as MegaphoneIcon } from "../../assets/images/megaphone-gradient.svg";
import { InfoList } from "./InfoList/InfoList";

export const Requests = () => (
  <StyledRequests>
    <CardHeader title="До моїх запитів" />
    <div className="content">
      <Card IconImg={MegaphoneIcon} title="513" subtitle="Всього запитів " />
      <InfoList
        items={[
          { title: "Актуальні", value: "201" },
          { title: "Протерміновані", value: "17" },
        ]}
      />
    </div>
  </StyledRequests>
);

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
