import { styled } from "styled-components";
import { fortmatNumber } from "../../../../utilits";

export const Price = ({ price, currency, price_for }) => (
  <StyledPrice className="flex items-center">
    {Number(price ?? 0) === 0
      ? "Не вказана"
      : fortmatNumber(Number(price ?? 0))}
    {Number(price ?? 0) !== 0 && (
      <span>
        {currency === "1" ? "₴" : currency === "2" ? "$" : "€"}
        {price_for}
      </span>
    )}
  </StyledPrice>
);

const StyledPrice = styled.div`
  padding: 1px 6px 2px;
  border-radius: 5px;
  background: rgba(103, 203, 78, 0.15);
  color: var(--green-light-2);
  font-family: "Open Sans";
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: 1;
  letter-spacing: 0.22px;
  span {
    font-weight: var(--font-weight-light);
  }
  @media (max-width: 700px) {
    height: 15px;
  }
`;
