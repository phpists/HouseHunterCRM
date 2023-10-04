import { styled } from "styled-components";
import { Info } from "./Info/Info";
import { Tarif } from "./Tarif/Tarif";
import { Workers } from "./Workers/Workers";
import { useState } from "react";

export const Company = () => {
  const [tarifOpen, setTarifOpen] = useState(false);
  const [tarifSelected, setTarifSelected] = useState(null);
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [paying, setPaying] = useState(false);

  const handleCloseTarif = () => {
    setTarifOpen(false);
    setTarifSelected(null);
    setSelectedWorkers([]);
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
    setPaying(true);
    console.log("here");
    setTimeout(() => {
      setPaying(false);
      setTarifSelected(null);
      setSelectedWorkers([]);
    }, 2500);
  };

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
    grid-template-columns: 1fr;
    /* height: calc(100svh - 107px); */
    height: calc(100svh - 187px);

    overflow: auto;
    .info {
      height: max-content;
      overflow: unset;
    }
  }
`;
