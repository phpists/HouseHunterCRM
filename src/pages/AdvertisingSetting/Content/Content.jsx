import styled from "styled-components";
import { Title } from "./Title";
import { TemplatesList } from "./TemplatesList/TemplatesList";
import { Setting } from "./Setting/Setting";
import { useGetStatusAccountQuery } from "../../../store/objects/objects.api";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useGetRealestateStatusQuery } from "../../../store/auth/auth.api";

export const Content = ({
  resources,
  selectedResources,
  onChange,
  onCreate,
  onSelect,
}) => {
  const location = useLocation();
  const { data: status, refetch } = useGetStatusAccountQuery();
  const { data: realestateStatus, refetch: refetchRealestateStatus } =
    useGetRealestateStatusQuery();

  useEffect(() => {
    status && refetch();
    realestateStatus && refetchRealestateStatus();
  }, [location]);

  console.log(realestateStatus);
  return (
    <StyledContent selectedTemplate={selectedResources}>
      <div>
        <Title title="Створені та Шаблони" />
        <TemplatesList
          resources={resources}
          selectedResources={selectedResources}
          onSelect={onSelect}
          olxAuth={!!status?.accounts?.[0]?.data?.id}
          realestateStatus={realestateStatus?.data?.length > 0}
        />
      </div>
      {selectedResources ? (
        <div>
          <Title title="Налаштування" />
          <Setting
            data={selectedResources}
            onChange={onChange}
            onCreate={onCreate}
            olxAccounts={status?.accounts}
            onRefreshAccountsData={refetch}
            onRefetchRealestateStatus={refetchRealestateStatus}
            realestateAccounts={realestateStatus?.data}
          />
        </div>
      ) : null}
    </StyledContent>
  );
};

const StyledContent = styled.div`
  display: grid;
  grid-template-columns: ${({ selectedTemplate }) =>
    selectedTemplate ? "1fr 1fr" : "1fr"};
  gap: 15px;
  padding: 20px;
  background: var(--modal-bg);
  border-radius: 15px;
  height: calc(100svh - 226px);
  overflow: hidden;
  .content-card {
    max-height: calc(100svh - 226px - 65px);
    overflow: auto;
  }
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    overflow: auto;
    grid-template-rows: max-content;
    .content-card {
      max-height: max-content;
      overflow: unset;
    }
  }
  @media (max-width: 800px) {
    padding: 10px;
    height: calc(100svh - 190px);
  }
`;
