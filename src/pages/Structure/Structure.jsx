import styled from "styled-components";
import { Header } from "./Header/Header";
import { Empty } from "./Empty";
import { StructureCard } from "./Header/StructureCard/StructureCard";
import { useState } from "react";
import { UserInfoCard } from "../../components/UserInfoCard/UserInfoCard";

export const Structure = () => {
  const [infoOpen, setInfoOpen] = useState(false);
  const [level, setLevel] = useState(1);

  const handleNextLevel = () => {
    if (level < 3) {
      setLevel(1 + level);
    }
  };

  return (
    <StyledStructure className="hide-scroll">
      <Header level={level} />
      {infoOpen && (
        <UserInfoCard onClose={() => setInfoOpen(false)} title="Детальніше" />
      )}
      <div className="structure-content hide-scroll">
        {/* <Empty /> */}
        <div className="structure-cards hide-scroll">
          <StructureCard
            onOpenInfo={() => setInfoOpen(true)}
            onNextLevel={handleNextLevel}
          />
          <StructureCard
            onOpenInfo={() => setInfoOpen(true)}
            onNextLevel={handleNextLevel}
          />
          <StructureCard
            onOpenInfo={() => setInfoOpen(true)}
            onNextLevel={handleNextLevel}
          />
          <StructureCard
            onOpenInfo={() => setInfoOpen(true)}
            onNextLevel={handleNextLevel}
          />
        </div>
      </div>
    </StyledStructure>
  );
};

const StyledStructure = styled.div`
  padding: 15px 20px;
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  position: relative;
  .structure-content {
    height: calc(100svh - 232px);
    overflow: auto;
  }
  .structure-cards {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    gap: 20px;
  }
`;
