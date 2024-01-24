import { styled } from "styled-components";
import { Info } from "./Info/Info";
import { Tarif } from "./Tarif/Tarif";
import { Workers } from "./Workers/Workers";
import { useEffect, useState } from "react";
import {
  useLazyContinueBillingQuery,
  useViewCompanyBalanceQuery,
} from "../../store/billing/billing.api";
import { handleResponse } from "../../utilits";
import { useActions } from "../../hooks/actions";
import { useLazyGetUserQuery } from "../../store/auth/auth.api";

export const Company = () => {
  const [tarifOpen, setTarifOpen] = useState(false);
  const [tarifSelected, setTarifSelected] = useState(null);
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [paying, setPaying] = useState(false);
  const [continueBilling] = useLazyContinueBillingQuery();
  const [loading, setLoading] = useState(false);
  const { data: balanceData, refetch } = useViewCompanyBalanceQuery();
  const { saveBalance, loginUser } = useActions();
  const [getProfile] = useLazyGetUserQuery();

  const handleGetUserData = () => {
    getProfile().then((resp) => {
      loginUser(resp?.data?.data);
    });
  };

  const handleCloseTarif = () => {
    if (!loading) {
      setTarifOpen(false);
      setTarifSelected(null);
      setSelectedWorkers([]);
    }
  };

  const handleSelectTarif = (value) => {
    setTarifSelected(value);
    !value && setSelectedWorkers([]);
  };

  const handleSelectWorker = (index) => {
    const isExist = selectedWorkers.find((w) => w === index);
    setSelectedWorkers(
      !!isExist
        ? selectedWorkers.filter((w) => w !== index)
        : [...selectedWorkers, index]
    );
  };

  const handlePay = () => {
    if (selectedWorkers?.length > 0) {
      setLoading(true);
      continueBilling({
        period: 1,
        workers_json: JSON.stringify(selectedWorkers),
      }).then((resp) =>
        handleResponse(
          resp,
          () => {
            setLoading(false);
            setPaying(true);
            refetch();
            handleGetUserData();
            setTimeout(() => {
              setPaying(false);
              setTarifSelected(null);
              setSelectedWorkers([]);
            }, 2500);
          },
          () => {
            setLoading(false);
            setPaying(false);
            setTarifSelected(null);
            setSelectedWorkers([]);
          }
        )
      );
    }
  };

  useEffect(() => {
    saveBalance(balanceData?.total?.toFixed(2));
  }, [balanceData]);

  return (
    <StyledCompany className="hide-scroll">
      <div className="info hide-scroll">
        <Info tarifOpen={tarifOpen} onCloseTarif={handleCloseTarif} />
        <Tarif
          tarifOpen={tarifOpen}
          onOpenTarif={() => setTarifOpen(true)}
          tarifSelected={tarifSelected}
          onSelectTarif={handleSelectTarif}
          onPay={handlePay}
          paying={paying}
          loading={loading}
        />
      </div>
      <Workers
        tarifSelected={tarifSelected}
        selectedWorkers={selectedWorkers}
        onSelect={handleSelectWorker}
      />
    </StyledCompany>
  );
};

const StyledCompany = styled.div`
  display: grid;
  grid-template-columns: 580px 1fr;
  gap: 0 30px;
  .info {
    height: calc(100svh - 82px - 24px - 40px);
    overflow: auto;
  }
  @media (max-width: 1500px) {
    grid-template-columns: 510px 1fr;
  }
  @media (max-width: 1399.9px) {
    grid-template-columns: 1fr;
    /* height: calc(100svh - 107px); */
    height: calc(100svh - 120px);

    overflow: auto;
    .info {
      height: max-content;
      overflow: unset;
    }
  }
`;
