import { styled } from "styled-components";
import { RepeatCard } from "./RepeatCard/RepeatCard";
import { Header } from "./Header/Header";
import { Cards } from "./Cards/Cards";
import { Divider } from "./Divider";

export const Tarif = ({
  tarifOpen,
  onOpenTarif,
  tarifSelected,
  onSelectTarif,
  onPay,
  paying,
  loading,
}) => {
  return (
    <StyledTarif
      className="flex flex-col justify-between"
      tarifOpen={tarifOpen}
    >
      <Header onOpenTarif={onOpenTarif} tarifOpen={tarifOpen} />
      {tarifOpen && (
        <>
          <Cards
            tarifSelected={tarifSelected}
            onSelectTarif={onSelectTarif}
            onPay={onPay}
            paying={paying}
            loading={loading}
          />
          {/* <Divider /> */}
        </>
      )}
      {/* <RepeatCard onOpenTarif={onOpenTarif} /> */}
    </StyledTarif>
  );
};

const StyledTarif = styled.div`
  padding: 16px;
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  height: calc(100svh - 78px - 24px - 40px - 481px);
  min-height: ${({ tarifOpen }) => (tarifOpen ? 180 : 135)}px;
  @media (max-width: 1399.9px) {
    height: max-content;
  }
`;
