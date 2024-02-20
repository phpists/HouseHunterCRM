import styled from "styled-components";
import { ObjectCard } from "../../components/ObjectCard/ObjectCard";
import { useGetAccessQuery } from "../../store/auth/auth.api";
import { handleCheckAccess } from "../../utilits";
import { Empty } from "../../components/Empty/Empty";
import { ObjectHistory } from "../../components/ObjectHistory/ObjectHistory";
import { useState } from "react";
import { Loader } from "../../components/Loader";

export const List = ({
  data,
  onFindSimilar,
  selected,
  onSelect,
  onHide,
  onFavorite,
  innerRef,
  loading,
}) => {
  const { data: accessData } = useGetAccessQuery();
  const [openHistoryModal, setOpenHistoryModal] = useState(null);

  return (
    <>
      {openHistoryModal && (
        <ObjectHistory
          onClose={() => setOpenHistoryModal(null)}
          object={openHistoryModal}
        />
      )}
      <StyledList className="hide-scroll" ref={innerRef}>
        {data?.length === 0 ? (
          <Empty loading={loading} />
        ) : (
          data.map((d, i) => (
            <ObjectCard
              key={i}
              selected={!!selected.find((j) => j === d?.id)}
              onSelect={() => onSelect(d?.id)}
              data={d}
              onToggleFavoriteStatus={
                onFavorite ? () => onFavorite(d?.id) : null
              }
              // onFindSimilar={() => onFindSimilar(d)}
              isEdit={handleCheckAccess(accessData, "objects", "edit")}
              onHide={() => onHide(d?.id)}
              onOpenTagsHistory={() =>
                setOpenHistoryModal({
                  id: d?.id,
                  isStreetBase: d?.obj_street_base === "1",
                })
              }
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
