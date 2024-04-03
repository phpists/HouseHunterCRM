import styled from "styled-components";
import { Header } from "./Header/Header";
import { InfoList } from "./InfoList/InfoList";

export const StatisticCard = ({ title, subtitle, icon, iconBg, infoData }) => {
  return (
    <StyledStatisticCard className="hide-scroll">
      <Header title={title} subtitle={subtitle} icon={icon} iconBg={iconBg} />
      <InfoList infoData={infoData} />
    </StyledStatisticCard>
  );
};

const StyledStatisticCard = styled.div`
  height: 204px;
  overflow: auto;
  @media (max-width: 1399.9px) {
    width: 100%;
    height: auto;
    /* overflow: unset; */
  }
  @media (min-width: 1400px) {
    width: 170px;
  }
  @media (min-width: 1440px) {
    width: 180px;
  }
  @media (min-width: 1500px) {
    width: 15svw;
    max-width: 200px;
  }
  @media (min-width: 1600px) {
    width: 14svw;
    max-width: 300px;
  }
  @media (min-width: 1700px) {
    width: 15svw;
    max-width: 350px;
  }
`;
