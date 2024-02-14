import styled from "styled-components";
import { Closed } from "./Closed";
import { useState } from "react";
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
}) => {
  const [open, setOpen] = useState(false);
  const options = ["₴", "$", "€"];

  return (
    <StyledPrice
      onMouseLeave={() => setOpen(false)}
      className={`${open && "flex items-center"} ${className}`}
    >
      {open ? (
        <Manage
          onChangeCurrency={(val) => onChangeCurrency(val)}
          activeCurrency={currency}
          priceFor={priceFor}
        />
      ) : (
        <Closed
          price={
            title ??
            `${fortmatNumber(Number(prices[currency]) ?? 0)} ${
              options[currency]
            }`
          }
          onOpen={() => setOpen(true)}
          title={title}
          subtitle={subtitle}
        />
      )}
    </StyledPrice>
  );
};

const StyledPrice = styled.div`
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 8px;
  width: 100%;
  transition: all 0.3s;
  height: 32px;
`;
