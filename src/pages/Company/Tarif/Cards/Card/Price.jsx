import { styled } from "styled-components";

export const Price = ({ price, color }) => (
  <StyledPrice color={color}>
    <div className="price">{price}₴</div>
    <div className="subtitle">за користувача</div>
  </StyledPrice>
);

const StyledPrice = styled.div`
  text-align: right;
  .price {
    font-family: Overpass;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 118%; /* 20.06px */
    letter-spacing: 0.34px;
    margin-bottom: 2px;
    color: ${({ color }) => color};
  }
  .subtitle {
    color: #fff;
    text-align: right;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
`;
