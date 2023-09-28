import styled from "styled-components";
import { CardHeader } from "../CardHeader";
import { Card } from "../Card/Card";
import { ReactComponent as HomeIcon } from "../../../assets/images/home-gradient.svg";
import { InfoList } from "../InfoList/InfoList";

export const Objects = () => (
  <StyledObjects>
    <CardHeader title="До моїх об’єктів" />
    <div className="content">
      <Card IconImg={HomeIcon} title="423" subtitle="Всього об'єктів " />
      <InfoList
        items={[
          { title: "Актуальні", value: "201" },
          { title: "Протерміновані", value: "17" },
          { title: "Об’єкти Street Base", value: "1 184" },
        ]}
      />
    </div>
  </StyledObjects>
);

const StyledObjects = styled.div`
  padding: 20px;
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  margin-bottom: 20px;
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
