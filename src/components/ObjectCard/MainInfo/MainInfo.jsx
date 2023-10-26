import styled from "styled-components";
import { Price } from "../../Price/Price";
import { Tags } from "./Tags/Tags";

export const MainInfo = ({ className, data }) => {
  return (
    <StyledMainInfo className={`${className}`}>
      <Price
        prices={[data?.price_UAH, data?.price_USD, data.price_EUR]}
        priceFor={Number(data?.price_for ?? 1)}
      />
      <Tags data={data} />
    </StyledMainInfo>
  );
};

const StyledMainInfo = styled.div`
  padding: 10px;
  border-radius: 9px;
  background: rgba(50, 50, 50, 0.8);
  min-height: 200px;
  margin-right: 10px;
  width: 220px;
  height: 32px;
  @media (max-width: 1399.9px) {
    height: 250px;
    width: calc((100% - 210px - 20px) / 2);
    margin-right: 0;
  }
`;
