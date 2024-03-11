import styled from "styled-components";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";
import { Date } from "./Date";
import { fortmatNumber, handleFormatDate } from "../../../../../utilits";

export const Price = ({ data, id }) => (
  <StyledPrice className="flex items-center justify-between">
    <div>
      <Title
        price={
          Number(data?.price_max ?? "0") === 0
            ? "Не вказана"
            : `до ${fortmatNumber(Number(data?.price_max ?? "0"))}${
                data?.price_currency === "1"
                  ? "₴"
                  : data?.price_currency === "2"
                  ? "$"
                  : "€"
              }`
        }
      />
      <Subtitle subtitle="Бажана ціна" />
    </div>
    <div>
      <Date
        deadline={handleFormatDate(Number(data?.dt_deadline * 1000), true)}
      />
      <Subtitle subtitle="Термін запиту" />
    </div>
  </StyledPrice>
);

const StyledPrice = styled.div`
  padding: 6px 14px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 10px;
`;
