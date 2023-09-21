import styled from "styled-components";
import { Header } from "./Header/Header";
import { InfoList } from "./InfoList/InfoList";

export const StatisticCard = ({ title, subtitle, icon, iconBg, infoData }) => {
  return (
    <StyledStatisticCard>
      <Header title={title} subtitle={subtitle} icon={icon} iconBg={iconBg} />
      <InfoList infoData={infoData} />
    </StyledStatisticCard>
  );
};

const StyledStatisticCard = styled.div`
  width: 230px;
  height: 204px;
  overflow: auto;
`;
