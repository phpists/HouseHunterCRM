import styled from "styled-components";
import { ObjectCard } from "../../components/ObjectCard/ObjectCard";
import { handleCheckAccess } from "../../utilits";
import { Empty } from "../../components/Empty/Empty";
import { ObjectHistory } from "../../components/ObjectHistory/ObjectHistory";
import { useState } from "react";
import { Loader } from "../../components/Loader";
import { ObjectCommentHistory } from "../../components/ObjectCommentHistory/ObjectCommentHistory";
import { AddToSelections } from "../Objects/AddToSelections";
import { Client } from "./Client/Client";
import { useAppSelect } from "../../hooks/redux";

export const List = ({
  data,
  onFindSimilar,
  selected,
  onSelect,
  onHide,
  onFavorite,
  innerRef,
  loading,
  isHideObjects,
  actionLoading,
  clientData,
  showClient,
  filters,
}) => {
  const { accessData } = useAppSelect((state) => state.auth);
  const [openHistoryModal, setOpenHistoryModal] = useState(null);
  const [openCommentHistoryModal, setOpenCommentHistoryModal] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(null);

  return (
    <>
      {openAddModal && (
        <AddToSelections
          onClose={() => setOpenAddModal(false)}
          idObject={openAddModal}
        />
      )}
      {openCommentHistoryModal && (
        <ObjectCommentHistory
          onClose={() => setOpenCommentHistoryModal(null)}
          object={openCommentHistoryModal}
        />
      )}
      {openHistoryModal && (
        <ObjectHistory
          onClose={() => setOpenHistoryModal(null)}
          object={openHistoryModal}
        />
      )}
      <StyledList ref={innerRef}>
        {clientData && showClient ? <Client clientData={clientData} /> : null}
        {data?.length === 0 || actionLoading ? (
          <Empty loading={loading || actionLoading} />
        ) : (
          data.map((d) => (
            <ObjectCard
              key={d?.id}
              selected={!!selected.find((j) => j === d?.id)}
              onSelect={() => onSelect(d?.id)}
              data={d}
              onToggleFavoriteStatus={
                onFavorite ? () => onFavorite(d?.id) : null
              }
              // onFindSimilar={() => onFindSimilar(d)}
              isEdit={handleCheckAccess(accessData, "objects", "edit")}
              onHide={() => onHide(d?.id)}
              isHideObjects={isHideObjects}
              onOpenTagsHistory={() =>
                setOpenHistoryModal({
                  id: d?.id,
                  isStreetBase: d?.obj_street_base === "1",
                })
              }
              onOpenCommetHistory={() =>
                setOpenCommentHistoryModal({ id: d?.id })
              }
              onAddToSelection={() => setOpenAddModal(d?.id)}
              showLike={typeof d?.like === "boolean"}
            />
          ))
        )}
        <div className="loader relative">
          {loading && data?.length > 0 && (
            <div className="loading-more">
              <Loader white />
            </div>
          )}
        </div>
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
