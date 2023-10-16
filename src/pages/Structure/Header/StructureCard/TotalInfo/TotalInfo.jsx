import styled from "styled-components";
import { Header } from "./Header/Header";
import { Card } from "./Card/Card";
import { useEffect, useState } from "react";
import userCheckIcon from "../../../../../assets/images/user-check-gradient.svg";
import megaphoneIcon from "../../../../../assets/images/card-megafon.svg";
import homeIcon from "../../../../../assets/images/home-gradient.svg";

export const TotalInfo = ({ open, onToggleOpen }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(false);
  }, [open]);

  const handleToggleCard = (e) =>
    e.target.classList.contains("clickable") && onToggleOpen();

  return (
    <StyledTotalInfo
      active={active}
      onClick={handleToggleCard}
      className="clickable notClickable"
    >
      <Header
        open={open}
        active={active}
        onToggleActive={() => setActive(!active && open)}
      />
      <div className="cards clickable notClickable">
        <Card open={open} title="Клієнти" icon={userCheckIcon} />
        <Card open={open} title="Запити" icon={megaphoneIcon} />
        <Card open={open} title="Об’єкти" icon={homeIcon} />
      </div>
    </StyledTotalInfo>
  );
};

const StyledTotalInfo = styled.div`
  padding: 8px;
  border-radius: 10px;
  background: rgba(50, 50, 50, 0.8);
  height: 224px;
  .cards {
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr;
    transition: all 0.3s;
    opacity: ${({ active }) => (active ? 0 : 1)};
  }
  @media (min-width: 1400px) {
    margin-right: 10px;
  }
  @media (max-width: 850px) {
    margin-top: 10px;
  }
`;
