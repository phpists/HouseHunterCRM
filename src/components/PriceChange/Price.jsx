import styled from "styled-components";
import { PositionCard } from "../Ranger/Footer/PositionCard";
import { Header } from "../Ranger/Header/Header";

const Price = ({ onChangeFilter, data }) => {
  return (
    <>
      <Header label={"Ціна"} />
      <Wrapper>
        <PositionCard
          title="Від"
          value={data?.street_base_object?.price_change}
          className="from-card"
          onChange={(val) => {
            onChangeFilter("street_base_object", {
              ...data?.street_base_object,
              price_change: val,
              price_change_up_procent: undefined,
            });
          }}
        />
        <span>
          <span>і</span>
          <span>(текст)</span>
        </span>
        <PositionCard
          title="Від"
          onChange={(val) =>
            onChangeFilter("street_base_object", {
              ...data?.street_base_object,
              price_change_period: val,
            })
          }
          value={data?.street_base_object?.price_change_period}
          className="from-card"
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
`;
