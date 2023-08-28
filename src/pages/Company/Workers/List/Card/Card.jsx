import { styled } from "styled-components";
import { Info } from "./Info/Info";
import { EnterStatus } from "./EnterStatus";
import { PayStatus } from "./PayStatus";
import { ReactComponent as Arrow } from "../../../../../assets/images/arrow-right-tarif.svg";
import { Selected } from "./Selected";

export const Card = ({ onOpenEdit, tarifSelected, onSelect, isSelected }) => (
  <StyledCard
    onClick={() => (tarifSelected ? onSelect() : onOpenEdit())}
    isSelected={isSelected}
  >
    <Info isSelected={isSelected} />
    {tarifSelected && isSelected ? (
      <Selected />
    ) : tarifSelected ? (
      <div />
    ) : (
      <EnterStatus />
    )}
    <PayStatus />
    <div className="flex items-center justify-center h-full">
      <Arrow />
    </div>
  </StyledCard>
);

const StyledCard = styled.button`
  padding: 9px 20px 9px 9px;
  display: grid;
  grid-template-columns: 1fr 145px 200px 30px;
  gap: 11px;
  width: 100%;
  transition: all 0.3s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
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
     border-left: 3px solid #50F835;
    svg {
        transform: rotate(0deg);
        opacity: 1;
        path {
            fill: #50f835;
        }
    }
  `}
`;
