import styled from "styled-components";
import { Closed } from "./Closed";
import { useRef, useState } from "react";
import { Manage } from "./Manage/Manage";
import { fortmatNumber } from "../../utilits";

export const Price = ({
  title,
  subtitle,
  className,
  price,
  priceFor,
  currency,
  onChangeCurrency,
  notChangeCurrency,
  type,
  onChangeType,
  rubricId,
}) => {
  const [open, setOpen] = useState(false);
  const options = ["₴", "$", "€"];
  const priceRef = useRef(null);

  const handleChangeCurrency = (val) => {
    onChangeCurrency(val);
    priceRef.current.blur();
  };

  const handleChangeType = (val) => {
    onChangeType(val);
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
          type={type}
          onChangeType={handleChangeType}
          rubricId={rubricId}
        />
      ) : (
        <Closed
          price={
            title ??
            `${
              Number(price) === 0
                ? "Ціну не обрано"
                : fortmatNumber(Number(price))
            } ${Number(price) === 0 ? "" : options[currency] ?? options[0]}`
          }
          onOpen={() => setOpen(true)}
          title={title}
          subtitle={subtitle}
          notChangeCurrency={notChangeCurrency}
          priceFor={priceFor}
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
