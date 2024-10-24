import styled from "styled-components";
import { Title } from "./Title";
import { TemplatesList } from "./TemplatesList/TemplatesList";
import { Setting } from "./Setting/Setting";
import { useGetStatusAccountQuery } from "../../../store/objects/objects.api";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useFlombuConnectStatusQuery,
  useGetRealestateStatusQuery,
} from "../../../store/auth/auth.api";
import { XHOUSE_COMPANY_ID } from "../../../constants";
import { useGetCompanyInfoQuery } from "../../../store/billing/billing.api";
import { useAppSelect } from "../../../hooks/redux";

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
  const { data: flombuStatus, refetch: resetchFflombuStatus } =
    useFlombuConnectStatusQuery();
  const { data: companyInfo } = useGetCompanyInfoQuery();
  const { user } = useAppSelect((state) => state.auth);
  const iS_AD_ACCESS =
    XHOUSE_COMPANY_ID.includes(companyInfo?.data?.id_hash) ||
    XHOUSE_COMPANY_ID.includes(user?.id);
  const [flomnuAuth, setFlombuAuth] = useState(false);

  useEffect(() => {
    status && refetch();
    realestateStatus && refetchRealestateStatus();
  }, [location]);

  useEffect(() => {
    setFlombuAuth(flombuStatus?.error === 0);
  }, [flombuStatus]);

  const handleToggleFlombuAuth = (val) => setFlombuAuth(val);

  return (
    <StyledContent selectedTemplate={selectedResources}>
      <div>
        <Title title="Створені та Шаблони" />
        <TemplatesList
          resources={resources?.filter((r) =>
            iS_AD_ACCESS ? true : r?.id !== "3"
          )}
          selectedResources={selectedResources}
          onSelect={onSelect}
          olxAuth={!!status?.accounts?.[0]?.data?.id}
          realestateStatus={realestateStatus?.data?.length > 0}
          flombuAuth={flomnuAuth}
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
            onRefreshFlombuStatus={resetchFflombuStatus}
            onToggleFlombuAuth={handleToggleFlombuAuth}
            flombuAuth={flomnuAuth}
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
