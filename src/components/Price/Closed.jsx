import styled from "styled-components";
import { ReactComponent as Arrow } from "../../assets/images/arrow-right.svg";

export const Closed = ({
  onOpen,
  price = 0,
  subtitle,
  notChangeCurrency,
  priceFor,
}) => (
  <StyledClosed
    className="flex items-start justify-between closed-wrappe closedPrice "
    onClick={notChangeCurrency ? () => null : onOpen}
  >
    <div className="closedPrice">
      <div className="price closedPrice">
        {`${price}`}{" "}
        {/* {priceFor && (
          <span className="priceFore">
            <span>/</span> {priceFor}
          </span>
        )} */}
      </div>
      {subtitle && (
        <div className="subtitle closedPrice labelItem">{subtitle}</div>
      )}
    </div>
    {!notChangeCurrency && <Arrow className="arrow closedPrice" />}
  </StyledClosed>
);

const StyledClosed = styled.div`
  padding: 6px;
  .price {
    color: var(--green);
    leading-trim: both;
    text-edge: cap;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 1.7; /* 16.52px */
    letter-spacing: 0.28px;
    width: max-content;
    .priceFore {
      font-size: 11px;
      font-weight: var(--font-weight-200);
      line-height: 1.8;
      span {
        margin: 0 4px;
      }
    }
  }
  .subtitle {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
    margin-top: 2px;
    text-align: left;
  }
  svg {
    transform: rotate(180deg);
    cursor: pointer;
    &:hover {
      g {
        opacity: 1;
      }
    }
  }
`;
