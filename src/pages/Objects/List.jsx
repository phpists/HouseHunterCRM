import styled from "styled-components";
import { ObjectCard } from "../../components/ObjectCard/ObjectCard";
import { Empty } from "../../components/Empty/Empty";
import { useGetAccessQuery } from "../../store/auth/auth.api";
import { handleCheckAccess, handleResponse } from "../../utilits";
import { useState } from "react";
import { AddToSelections } from "./AddToSelections";

import { Loader } from "../../components/Loader";
import { ObjectPriceHistory } from "../../components/ObjectPriceHistory";
import { ObjectCommentHistory } from "../../components/ObjectCommentHistory/ObjectCommentHistory";
import { ObjectHistory } from "../../components/ObjectHistory/ObjectHistory";
import { useLazyDeleteObjectQuery } from "../../store/objects/objects.api";
import cogoToast from "cogo-toast";

export const List = ({
  selected,
  onSelect,
  data,
  toggleFavoriteStatus,
  onFindSimilar,
  innerRef,
  loading,
  actionLoading,
  onDeleteSuccess,
}) => {
  const { data: accessData } = useGetAccessQuery();
  const [openAddModal, setOpenAddModal] = useState(null);
  const [openHistoryModal, setOpenHistoryModal] = useState(null);
  const [openHistoryPriceModal, setOpenHistoryPriceModal] = useState(null);
  const [openCommentHistoryModal, setOpenCommentHistoryModal] = useState(null);
  const [currency, setCurrency] = useState(0);
  const [deleteObject] = useLazyDeleteObjectQuery();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = (id) => {
    setDeleting(true);
    deleteObject([id]).then((resp) => {
      handleResponse(resp, () => {
        cogoToast.success(`Обєкт успішно видалено!`, {
          hideAfter: 3,
          position: "top-right",
        });
        onDeleteSuccess(id);
      });
      setDeleting(false);
    });
  };

  return (
    <>
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
      {openHistoryPriceModal && (
        <ObjectPriceHistory
          onClose={() => setOpenHistoryPriceModal(null)}
          data={openHistoryPriceModal}
        />
      )}
      {openAddModal && (
        <AddToSelections
          onClose={() => setOpenAddModal(false)}
          idObject={openAddModal}
        />
      )}
      <StyledList className="hide-scroll" ref={innerRef}>
        {data?.length === 0 || actionLoading || deleting ? (
          <Empty loading={loading || actionLoading || deleting} />
        ) : (
          <>
            {data.map((d, i) => (
              <ObjectCard
                key={d?.id}
                selected={!!selected.find((j) => j === d?.id)}
                onSelect={() => onSelect(d?.id)}
                data={d}
                onToggleFavoriteStatus={() => toggleFavoriteStatus(d?.id)}
                onFindSimilar={() => onFindSimilar(d)}
                isEdit={handleCheckAccess(accessData, "objects", "edit")}
                onAddToSelection={() => setOpenAddModal(d?.id)}
                onOpenTagsHistory={() =>
                  setOpenHistoryModal({
                    id: d?.id,
                    isStreetBase: d?.obj_street_base === "1",
                  })
                }
                onOpenCommetHistory={() =>
                  setOpenCommentHistoryModal({ id: d?.id })
                }
                onOpenPriceHistory={() =>
                  setOpenHistoryPriceModal(d?.price_history_json)
                }
                currency={currency}
                onChangeCurrency={(val) => setCurrency(val)}
                onDelete={() => handleDelete(d?.id)}
                searchTag="?objects"
              />
            ))}
          </>
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
  position: relative;

  @media (max-width: 800px) {
    height: calc(100svh - 200px);
  }
`;
