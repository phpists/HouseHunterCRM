import { useState } from "react";
import { Card } from "./Card/Card";
import { styled } from "styled-components";

const CARDS_DATA = [
  { title: "Бомж", priceTitle: "1 000", color: "#5D63FF", price: 1000 },
  { title: "Еліта", priceTitle: "900", color: "#E9A624", price: 900 },
  { title: "Цар системи", priceTitle: "800", color: "#50F835", price: 800 },
];

export const Cards = ({ tarifSelected, onSelectTarif, onPay, paying }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (index) => {
    onSelectTarif(null);
    setOpen(index);
  };

  return (
    <StyledCards>
      {CARDS_DATA.map(({ title, priceTitle, price, color }, i) => (
        <Card
          key={i}
          title={title}
          price={priceTitle}
          color={color}
          open={open === i}
          onOpen={() => handleOpen(i)}
          selected={tarifSelected?.index === i}
          onSelect={(isReset) =>
            onSelectTarif(isReset ? null : { index: i, price })
          }
          onPay={onPay}
          paying={paying}
        />
      ))}
    </StyledCards>
  );
};

const StyledCards = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;
