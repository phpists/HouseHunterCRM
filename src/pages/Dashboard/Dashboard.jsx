import styled from "styled-components";
import { Empty } from "./Empty/Empty";
import { Clients } from "./Clients/Clients";
import { Objects } from "./Objects/Objects";
import { Requests } from "./Requests";
import { LastRequests } from "./LastRequests/LastRequests";
import { Steps } from "./Steps/Steps";
import { Info } from "./Info";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header/Header";
import { InfoButton } from "./InfoButton";

export const Dashboard = () => {
  const { pathname } = useLocation();
  const [empty, setEmpty] = useState(pathname === "/empty");

  useEffect(() => {
    setEmpty(pathname === "/empty");
  }, [pathname]);

  return (
    <StyledDashboard className="hide-scroll">
      {empty ? (
        <Empty />
      ) : (
        <div className="dashboard-content hide-scroll">
          <Header />
          <div className="dashboard-col hide-scroll">
            <Clients />
            <Objects />
            <Requests />
          </div>
          <LastRequests />
          <InfoButton className="dashboard-mob-info-btn" />
          <div className="dashboard-col hide-scroll info-cards-desktop">
            <Steps className="steps-wrapper hide-scroll" />
            <Info />
          </div>
        </div>
      )}
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  .dashboard-content {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr minmax(390px, 1fr) 1fr;
    @media (min-width: 1600px) {
      grid-template-columns: minmax(500px, 1fr) minmax(440px, 500px) minmax(
          440px,
          1fr
        );
    }
  }
  .dashboard-col {
    height: max-content;
    max-height: calc(100svh - 148px);
    overflow: auto;
  }
  .steps-wrapper {
    width: 100%;
    padding: 20px;
    background: #686de7;
    box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
    margin-bottom: 20px;
    height: calc(100svh - 365px);
    max-height: 496px;
    overflow: auto;
    min-height: 200px;
    .divider {
      margin: 14px 0;
    }
  }
  .dashboard-mob-info-btn {
    display: none;
  }

  @media (max-width: 1100px) {
    .dashboard-content {
      grid-template-columns: 1fr;
      max-height: max-content;
      overflow: auto;
      height: calc(100svh - 98px - 40px);
    }
    .dashboard-col {
      max-height: max-content;
    }
    .info-cards-desktop {
      display: none;
    }
  }

  @media (max-width: 800px) {
    .dashboard-mob-info-btn {
      display: flex;
    }
  }
`;
