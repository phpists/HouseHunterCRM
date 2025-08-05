import styled from "styled-components";
import { PositionCard } from "../Ranger/Footer/PositionCard";
import { Header } from "../Ranger/Header/Header";

const Price = ({ onChangeFilter, data, onFocus, onBlur }) => {
  const { price_change, price_change_up_procent } = data?.street_base_object;
  return (
    <>
      <Header label={"Ціна"} />
      <Wrapper>
        <PositionCard
          onFocus={onFocus}
          onBlur={() => {
            onBlur();
            if (price_change < 50) {
              onChangeFilter({ price_change: 50 });
            }
          }}
          title="Від"
          value={price_change}
          className="from-card"
          placeholder="min 50"
          mainType={"$"}
          onChange={(val) => {
            onChangeFilter({ price_change: val });
          }}
          error={price_change < 50 && price_change !== 0}
        />
        <PositionCard
          title="Від"
          mainType={"％"}
          onFocus={onFocus}
          onBlur={() => {
            onBlur();
            if (price_change_up_procent < 2) {
              onChangeFilter({ price_change_up_procent: 2 });
            }
          }}
          placeholder="min 2"
          onChange={(val) => onChangeFilter({ price_change_up_procent: val })}
          value={price_change_up_procent}
          className="from-card"
          error={price_change_up_procent < 2 && price_change_up_procent !== 0}
        />
      </Wrapper>
    </>
  );
};

export default Price;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 12px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%;
    letter-spacing: 0.28px;
    display: flex;
    gap: 6px;
    align-items: center;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    .from-card {
      width: 100%;
    }
    .value {
      width: 100%;
    }
  }
`;
