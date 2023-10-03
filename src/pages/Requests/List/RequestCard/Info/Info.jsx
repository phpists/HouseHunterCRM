import styled from "styled-components";
import { Price } from "../../../../../components/Price/Price";
import { Tags } from "./Tags/Tags";

export const Info = () => {
  return (
    <StyledInfo className="hide-scroll clickable">
      <Price
        title="до 20 000₴"
        subtitle="Бажана ціна"
        className="price-wrapper"
      />
      <Tags />
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
  @media (max-width: 1600px) {
    width: 100%;
  }
`;
