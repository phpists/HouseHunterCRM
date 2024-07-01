import styled from "styled-components";
import { Selected } from "./Selected";
import { ShowButton } from "./ShowButton";
import { CopyLink } from "../../../components/CopyLink";
import { SelectItems } from "../../../components/SelectItems/SelectItems";
import { ChatButton } from "./ChatButton/ChatButton";
import { FilterButton } from "./FilterButton/FilterButton";
import { useLazyHideObjectFromSelectionsQuery } from "../../../store/selections/selections.api";
import { handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { AddToSelections } from "../../Objects/AddToSelections";
import { ClientButton } from "./ClientButton";
import { BackButton } from "../../../components/BackButton";

export const Header = ({
  onRefresh,
  selectedCount,
  selected,
  filters,
  onChangeFilter,
  filtersFields,
  onApplyFilter,
  allCount,
  onSelectAll,
  objectsIds,
  onHide,
  onToggleHidden,
  showObjectHide,
  onChangeActionLoading,
  showClient,
  onToggleShowClient,
  newMessege,
  onFastCopy,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hideObject] = useLazyHideObjectFromSelectionsQuery();
  const [openAddToSelection, setOpenAddToSelection] = useState(false);

  const handleHide = () => {
    onChangeActionLoading(true);
    hideObject({ id_request_group: id, id_objects: selected }).then((resp) => {
      handleResponse(resp, () => {
        cogoToast.success("Статус успішно змінено!", {
          hideAfter: 3,
          position: "top-right",
        });
        onHide();
      });
      onChangeActionLoading(false);
    });
  };

  const handleAddToSelection = () => setOpenAddToSelection(true);
  const handleAddToSelectionSuccess = () => onSelectAll(true);

  return (
    <StyledHeader>
      {openAddToSelection && (
        <AddToSelections
          onClose={() => setOpenAddToSelection(false)}
          idObject={selected}
          onSuccess={handleAddToSelectionSuccess}
        />
      )}
      <div className="main-header-content-wrapper flex items-center justify-between">
        <div className="flex items-center">
          <BackButton onClick={() => navigate(-1)} />
          <Selected selectedCount={selectedCount} />
        </div>
        <div className="main-header-content-btns flex items-center">
          <ClientButton
            active={showClient}
            onClick={() => onToggleShowClient(!showClient)}
          />
          <div className="btns flex items-center">
            {/* <AddButton onRefresh={onRefresh} objectsIds={objectsIds} /> */}
            <CopyLink
              className="copy-btn"
              link={`https://selection.house-hunter.info/?id=${id}`}
            />
            <ChatButton newMessege={newMessege} />
          </div>
          <div className="action-btns flex items-center">
            <ShowButton
              active={showObjectHide === "1"}
              onClick={onToggleHidden}
            />
            <FilterButton
              filters={filters}
              onChangeFilter={onChangeFilter}
              filtersFields={filtersFields}
              onApplyFilter={onApplyFilter}
              showObjectHide={showObjectHide}
            />
          </div>
          <div className="select-items-wrapper">
            <SelectItems
              title="підбірок"
              selectedCount={selectedCount}
              allCount={allCount}
              onSelectAll={onSelectAll}
              //   onToggleFavorite={handleToggleFavorites}
              onHide={handleHide}
              noFavorite
              isHideObjects={showObjectHide}
              onAddToSelection={handleAddToSelection}
              onFastCopy={onFastCopy}
            />
          </div>
        </div>
      </div>
      <div className="select-wrapper-mobile">
        <SelectItems
          title="підбірок"
          selectedCount={selectedCount}
          allCount={allCount}
          onSelectAll={onSelectAll}
          className="mobile-select"
          //   onToggleFavorite={handleToggleFavorites}
          onHide={handleHide}
          noFavorite
          isHideObjects={showObjectHide}
          onAddToSelection={handleAddToSelection}
          onFastCopy={onFastCopy}
        />
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 20px;

  .action-btns {
    margin: 0 0px 0 40px;
  }
  .select-items-wrapper {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-left: 20px;
  }
  .select-wrapper-mobile {
    display: none;
  }
  @media (max-width: 800px) {
    .select-items-wrapper {
      display: none;
    }

    .select-wrapper-mobile {
      display: block;
      margin-top: 20px;
    }
    .mobile-select {
      width: 100%;
      justify-content: space-between;
    }
    .action-btns {
      margin: 0 0px 0 15px;
    }
  }
  @media (max-width: 450px) {
    .main-header-content-wrapper {
      flex-direction: column;
      align-items: start;
    }
    .main-header-content-btns {
      margin-top: 10px;
      width: 100%;
      justify-content: end;
    }
  }
`;
