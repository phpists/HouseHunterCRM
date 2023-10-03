import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { Actions } from "./Actions/Actions";
import { Card } from "./Card/Card";
import { useState } from "react";
import { ObjectModal } from "./ObjectModal";
import { MobileHeader } from "./MobileHeader/MobileHeader";
import { SelectItems } from "../../../components/SelectItems/SelectItems";

export const Objects = ({ selected, onSelect }) => {
  const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const [openInfo, setOpenInfo] = useState(false);

  return (
    <StyledObjects>
      {openInfo && <ObjectModal onClose={() => setOpenInfo(false)} />}
      <Header />
      <div className="objects-content hide-scroll">
        <Actions />
        <MobileHeader />
        <SelectItems title="запитів" className="mobile-select" />
        {data.map((c, i) => (
          <Card
            key={1}
            selected={selected === i}
            onSelect={() => onSelect(i)}
            onOpenInfo={() => setOpenInfo(true)}
          />
        ))}
      </div>
    </StyledObjects>
  );
};

const StyledObjects = styled.div`
  border-radius: 15px;
  background: #2b2b2b;
  .objects-content {
    padding: 10px;
    height: calc(100svh - 287px);
    overflow: auto;
  }
  .mobile-select {
    display: none;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  @media (max-width: 1550px) {
    .objects-content {
      height: auto;
    }
  }
  @media (max-width: 700px) {
    background: none;
    .mobile-select {
      display: flex;
    }
    .objects-content {
      padding: 0;
    }
  }
`;
