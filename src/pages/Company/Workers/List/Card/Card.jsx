import { styled } from "styled-components";
import { Info } from "./Info/Info";
import { EnterStatus } from "./EnterStatus";
import { PayStatus } from "./PayStatus";
import { ReactComponent as Arrow } from "../../../../../assets/images/arrow-right-tarif.svg";
import { Selected } from "./Selected";
import { handleCheckBilling } from "../../../../../utilits";

export const Card = ({
  onOpenEdit,
  tarifSelected,
  onSelect,
  isSelected,
  name,
  photo,
  phone,
  active,
  billingTo,
  level,
  payCount,
  onOpenTarif,
  id,
  isCurrentUser,
  tarifPrice,
  namePermision,
}) => {
  const handleClick = (e) => {
    if (!e.target.classList.contains("notClickable")) {
      onOpenEdit();
    }
  };

  return (
    <StyledCard
      onClick={(e) => (tarifSelected ? onSelect() : handleClick(e))}
      isSelected={isSelected}
    >
      <div className="flex items-center info-wrapper">
        <Info
          isSelected={isSelected}
          name={name}
          photo={photo}
          phone={phone}
          level={level}
          namePermision={namePermision}
        />
        <Arrow className="more-arrow-mobile" />
      </div>
      {tarifSelected && isSelected ? (
        <Selected payCount={payCount} tarifPrice={tarifPrice} />
      ) : tarifSelected ? (
        <div />
      ) : (
        <EnterStatus status={active} isCurrentUser={isCurrentUser} id={id} />
      )}
      <PayStatus
        status={handleCheckBilling(billingTo)}
        billingTo={billingTo}
        onOpenTarif={onOpenTarif}
      />
      <div className="flex items-center justify-center h-full more-arrow-desktop">
        <Arrow />
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.button`
  padding: 9px 20px 9px 9px;
  display: grid;
  grid-template-columns: 1fr 145px 200px 30px;
  gap: 11px;
  width: 100%;
  transition: all 0.3s;
  border-bottom: 1px solid var(--bg-20);
  svg {
    transform: rotate(-45deg);
    opacity: 0.4;
    transition: all 0.3s;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.07);
    svg {
      transform: rotate(0deg);
      opacity: 1;
    }
  }
  ${({ isSelected }) =>
    isSelected &&
    `
     background: rgba(255, 255, 255, 0.07);
     border-left: 3px solid var(--green-light-2);
    svg {
        transform: rotate(0deg);
        opacity: 1;
        path {
            fill: var(--green-light-2);
        }
    }
  `}
  .more-arrow-mobile {
    display: none;
  }
  @media (max-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .more-arrow-desktop {
      display: none;
    }
    .more-arrow-mobile {
      display: block;
      margin-left: 12px;
    }
    .info-wrapper {
      grid-column: 1/3;
    }
  }
`;
