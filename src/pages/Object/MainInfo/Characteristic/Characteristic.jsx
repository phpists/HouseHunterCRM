import { styled } from "styled-components";
import { Header } from "./Header";
import { Select } from "../../../../components/Select/Select";
import { DetailPosition } from "./DetailPosition";
import { Categories } from "./Categories";
import { Info } from "./Info";
import { useState } from "react";

export const Characteristic = () => {
  const [open, setOpen] = useState(false);

  return (
    <StyledCharacteristic open={open}>
      <Header open={open} onToggleOpen={() => setOpen(!open)} />
      <div className="content-wrapper hide-scroll">
        <div className="characteristic-content">
          <Select
            value="Квартири / Довгострокова аренда квартир"
            label="Категорія"
            labelActive="Оберіть категорію"
            className="mb-2"
            hideArrowDefault
          />
          <Select
            value="Львівська область / Дрогобич"
            label="Розташування"
            labelActive="Оберіть розташування"
            className="mb-2"
            hideArrowDefault
          />
          <DetailPosition />
        </div>
        <Info />
        <Categories />
      </div>
    </StyledCharacteristic>
  );
};

const StyledCharacteristic = styled.div`
  border-radius: 10px;
  background: #3d3d3d;
  padding: 14px 14px 12px 15px;
  margin-bottom: 11px;
  .content-wrapper {
    height: calc(100svh - 420px);
    overflow: auto;
  }
  .characteristic-content {
    border-radius: 10px;
    background: #323232;
    padding: 8px;
  }
  @media (max-width: 1300px) {
    .content-wrapper {
      height: 411px;
    }
  }

  @media (max-width: 800px) {
    margin-bottom: 0px;
    padding: 10px;
    .content-wrapper {
      transition: all 0.3s;
      height: ${({ open }) => (open ? "calc(100svh - 420px)" : "0px")};
    }
  }
`;
