import styled from "styled-components";
import { Closed } from "./Closed";
import { useRef, useState } from "react";
import { Manage } from "./Manage/Manage";
import { fortmatNumber } from "../../utilits";

export const Price = ({
  title,
  subtitle,
  className,
  prices,
  priceFor,
  currency,
  onChangeCurrency,
  notChangeCurrency,
}) => {
  const [open, setOpen] = useState(false);
  const options = ["₴", "$", "€"];
  const priceRef = useRef(null);

  const handleChangeCurrency = (val) => {
    onChangeCurrency(val);
    priceRef.current.blur();
  };

  return (
    <StyledPrice
      className={`${open && "flex items-center"} ${className}`}
      onBlur={() => setOpen(false)}
      ref={priceRef}
    >
      {open ? (
        <Manage
          onChangeCurrency={handleChangeCurrency}
          activeCurrency={currency}
          priceFor={priceFor}
        />
      ) : (
        <Closed
          price={
            title ??
            `${
              Number(prices[currency]) === 0
                ? "Ціну не обрано"
                : fortmatNumber(Number(prices[currency]))
            } ${
              Number(prices[currency]) === 0
                ? ""
                : options[currency] ?? options[0]
            }`
          }
          onOpen={() => setOpen(true)}
          title={title}
          subtitle={subtitle}
          notChangeCurrency={notChangeCurrency}
        />
      )}
    </StyledPrice>
  );
};

const StyledPrice = styled.button`
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 8px;
  width: 100%;
  transition: all 0.3s;
  height: 32px;
  &:hover {
    .arrow {
      g {
        opacity: 1;
      }
    }
  }
`;
