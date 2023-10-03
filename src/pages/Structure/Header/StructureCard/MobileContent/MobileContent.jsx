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

export const MobileContent = ({ onOpenInfo }) => {
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [totalInfoOpened]);

  return (
    <StyledMobileContent open={open}>
      <div className="main-info-wrapper">
        <ProfilleInfo onOpenInfo={onOpenInfo} />
        <Biling open={true} />
      </div>
      <MobileBilling />
      <div className="more-billing-wrapper more-content-wrapper">
        <Divider />
        <BossCard />
        <Divider />
        <Structure />
      </div>
      <div className="footer-info-wrapper  more-content-wrapper">
        <Statistic />
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
    margin-bottom: 10px;
  }
  .more-billing-wrapper {
    margin-bottom: 14px;
  }
  @media (min-width: 1660px) {
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
  }
`;
