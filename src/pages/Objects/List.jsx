import styled from "styled-components";
import { ObjectCard } from "../../components/ObjectCard/ObjectCard";
import { Empty } from "../../components/Empty/Empty";
import { useGetAccessQuery } from "../../store/auth/auth.api";
import { handleCheckAccess } from "../../utilits";
import { useState } from "react";
import { AddToSelections } from "./AddToSelections";
import { ObjectHistory } from "../../components/ObjectHistory/ObjectHistory";

export const List = ({
  selected,
  onSelect,
  data,
  toggleFavoriteStatus,
  onFindSimilar,
  innerRef,
}) => {
  const { data: accessData } = useGetAccessQuery();
  const [openAddModal, setOpenAddModal] = useState(null);
  const [openHistoryModal, setOpenHistoryModal] = useState(null);

  return (
    <>
      {openHistoryModal && (
        <ObjectHistory
          onClose={() => setOpenHistoryModal(null)}
          idObject={openHistoryModal}
        />
      )}
      {openAddModal && (
        <AddToSelections
          onClose={() => setOpenAddModal(false)}
          idObject={openAddModal}
        />
      )}
      <StyledList className="hide-scroll" ref={innerRef}>
        {data?.length === 0 ? (
          <Empty />
        ) : (
          data.map((d, i) => (
            <ObjectCard
              key={i}
              selected={!!selected.find((j) => j === d?.id)}
              onSelect={() => onSelect(d?.id)}
              data={d}
              onToggleFavoriteStatus={() => toggleFavoriteStatus(d?.id)}
              onFindSimilar={() => onFindSimilar(d)}
              isEdit={handleCheckAccess(accessData, "objects", "edit")}
              onAddToSelection={() => setOpenAddModal(d?.id)}
              onOpenTagsHistory={() => setOpenHistoryModal(d?.id)}
            />
          ))
        )}
      </StyledList>
    </>
  );
};

const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  height: calc(100svh - 225px);
  overflow: auto;
  gap: 10px;
  @media (max-width: 800px) {
    height: calc(100svh - 200px);
  }
`;
