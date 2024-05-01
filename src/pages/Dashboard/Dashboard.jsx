import styled from "styled-components";
import { Empty } from "./Empty/Empty";
import { Clients } from "./Clients/Clients";
import { Objects } from "./Objects/Objects";
import { Requests } from "./Requests";
import { LastRequests } from "./LastRequests/LastRequests";
import { Steps } from "./Steps/Steps";
import { Info } from "./Info";
import { Header } from "./Header/Header";
import { InfoButton } from "./InfoButton";
import { useGetClientsCountQuery } from "../../store/clients/clients.api";
import { useLazyGetStatisticWorkerQuery } from "../../store/structure/structure.api";

import { useEffect, useState } from "react";
import { useAppSelect } from "../../hooks/redux";
import { Loader } from "../../components/Loader";

const Dashboard = ({ isClientsAccess }) => {
  const { user } = useAppSelect((state) => state.auth);
  const { data, isLoading } = useGetClientsCountQuery(null, {
    skip: !isClientsAccess,
  });
  const [getWorkerStatistic, { data: statisticData }] =
    useLazyGetStatisticWorkerQuery();
  const [steps, setSteps] = useState(!localStorage.getItem("modalClosed"));

  const handleClose = () => {
    setSteps(false);
    localStorage.setItem("modalClosed", true);
  };

  useEffect(() => {
    if (user?.id) {
      getWorkerStatistic(user?.id);
    } // eslint-disable-next-line
  }, [user]);

  return (
    <StyledDashboard className="hide-scroll">
      {isLoading ? (
        <Loader white className="dashboardLoader" />
      ) : data?.count === 0 || !data?.count ? (
        <Empty />
      ) : (
        <div className="dashboard-content hide-scroll">
          <Header steps={steps} />
          <div className="dashboard-col hide-scroll dashboard-col-statistic">
            <Clients data={data} />
            <Objects statisticData={statisticData} />
            <Requests statisticData={statisticData} />
          </div>
          <LastRequests />
          <InfoButton className="dashboard-mob-info-btn" />
          <div className="dashboard-col hide-scroll info-cards-desktop">
            {steps && (
              <Steps
                className="steps-wrapper hide-scroll"
                close
                onClose={handleClose}
              />
            )}
            <Info className={!steps && "info-wrapper"} />
          </div>
        </div>
      )}
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  .dashboardLoader {
    height: 40px;
    margin-top: 40px;
  }
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
    background: var(--dark-card-bg);
  }
  .dashboard-col-statistic {
    height: calc(100svh - 148px);
  }
  .info-wrapper {
    height: calc(100svh - 148px);
  }
  .steps-wrapper {
    width: 100%;
    padding: 20px;
    background: var(--blue-banner);
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
      overflow: unset;
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
  @media (max-width: 500px) {
    .dashboard-content {
      height: calc(100svh - 29px - 40px);
    }
  }
`;

export default Dashboard;
