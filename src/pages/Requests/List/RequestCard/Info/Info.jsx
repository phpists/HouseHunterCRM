import styled from "styled-components";
import { Price } from "../../../../../components/Price/Price";
import { Tags } from "./Tags/Tags";
import { fortmatNumber } from "../../../../../utilits";

export const Info = ({
  priceMax,
  roomMin,
  roomMax,
  areaMin,
  storeyMin,
  storeyMax,
}) => {
  return (
    <StyledInfo className="hide-scroll clickable">
      <Price
        title={`до ${fortmatNumber(Number(priceMax ?? 0))}₴`}
        subtitle="Бажана ціна"
        className="price-wrapper"
      />
      <Tags
        roomMin={roomMin}
        roomMax={roomMax}
        areaMin={areaMin}
        storeyMin={storeyMin}
        storeyMax={storeyMax}
      />
    </StyledInfo>
  );
};

const StyledInfo = styled.div`
  border-radius: 9px;
  background: rgba(50, 50, 50, 0.6);
  padding: 10px;
  height: 136px;
  overflow: auto;
  width: 264px;
  .price-wrapper {
    height: 44px;
    .closed-wrapper {
      align-items: center !important;
    }
    .price {
      line-height: 0.2;
      margin-top: 10px;
    }
  }
  @media (min-width: 1400px) {
    height: 136px;
    width: 230px;
  }
  @media (min-width: 1600px) {
    height: 136px;
  }
  @media (max-width: 1399.9px) {
    width: 100%;
  }
`;
