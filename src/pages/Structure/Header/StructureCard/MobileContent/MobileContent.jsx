import styled from "styled-components";
import { ProfilleInfo } from "../ProfilleInfo/ProfilleInfo";
import { Biling } from "../Biling/Biling";
import { Statistic } from "../Statistic/Statistic";
import { TotalInfo } from "../TotalInfo/TotalInfo";
import { Arrow } from "../Arrow";
import { useEffect, useState } from "react";
import { MobileBilling } from "./MobileBilling";
import { Divider } from "./Divider";
import { BossCard } from "../Biling/BossCard/BossCard";
import { Structure } from "../Biling/Structure/Structure";
import { MoreButton } from "./MoreButton";

export const MobileContent = ({ onOpenInfo, data, statisticData }) => {
  const [totalInfoOpened, setTotalInfoOpened] = useState(false);
  const [open, setOpen] = useState(false);

  const handleResize = () => {
    const innerWidth = window.innerWidth;
    if (innerWidth <= 850 && !totalInfoOpened) {
      setTotalInfoOpened(true);
    } else if (innerWidth > 850 && totalInfoOpened) {
      setTotalInfoOpened(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [totalInfoOpened]);

  return (
    <StyledMobileContent open={open}>
      <div className="main-info-wrapper">
        <ProfilleInfo onOpenInfo={onOpenInfo} data={data} />
        <Biling open={true} data={data} />
      </div>
      <MobileBilling data={data} />
      <div className="more-billing-wrapper more-content-wrapper">
        {data?.name_parent?.length > 0 ? (
          <>
            <Divider />
            <BossCard data={data} />
          </>
        ) : null}
        <Divider />
        <Structure />
      </div>
      <div className="footer-info-wrapper  more-content-wrapper">
        <Statistic statisticData={statisticData} />
        <TotalInfo open={totalInfoOpened} onToggleOpen={() => null} />
      </div>
      <MoreButton open={open} onToggle={() => setOpen(!open)} />
      <Arrow />
    </StyledMobileContent>
  );
};

const StyledMobileContent = styled.div`
  .main-info-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 10px;
  }
  .footer-info-wrapper {
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: 10px;
    margin: 10px 0;
  }
  .more-billing-wrapper {
    margin-bottom: 14px;
    display: none;
  }
  @media (min-width: 1400px) {
    display: none;
  }
  @media (max-width: 850px) {
    .footer-info-wrapper {
      grid-template-columns: 1fr;
    }
    .main-info-wrapper {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
      margin-bottom: 10px;
    }
    .more-content-wrapper {
      display: ${({ open }) => (open ? "block" : "none")};
    }
    .more-billing-wrapper {
      display: ${({ open }) => (open ? "block" : "none")};
    }
  }
`;
