import styled from "styled-components";
import { Selected } from "./Selected";
import { ShowButton } from "./ShowButton";
import { AddButton } from "./AddButton/AddButton";
import { CopyLink } from "../../../components/CopyLink";
import { SelectItems } from "../../../components/SelectItems/SelectItems";
import { ChatButton } from "./ChatButton/ChatButton";
import { FilterButton } from "./FilterButton/FilterButton";
import { useLazyAddToFavoritesQuery } from "../../../store/objects/objects.api";
import { useLazyHideObjectFromSelectionsQuery } from "../../../store/selections/selections.api";
import { handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";
import { useParams } from "react-router-dom";

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
}) => {
  const { id } = useParams();
  const [addToFavorites] = useLazyAddToFavoritesQuery();
  const [hideObject] = useLazyHideObjectFromSelectionsQuery();

  const handleHide = () => {
    Promise.all(
      selected?.map((id_object) =>
        hideObject({ id_request_group: id, id_object }).then((resp) => {
          handleResponse(resp, () => {
            cogoToast.success("Статус успішно змінено!", {
              hideAfter: 3,
              position: "top-right",
            });
          });
        })
      )
    ).then((resp) => {
      onHide();
    });
  };

  return (
    <StyledHeader>
      <div className="main-header-content-wrapper flex items-center justify-between">
        <Selected selectedCount={selectedCount} />
        <div className="main-header-content-btns flex items-center">
          <div className="btns flex items-center">
            <ShowButton
              active={showObjectHide === "1"}
              onClick={onToggleHidden}
            />
            {/* <AddButton onRefresh={onRefresh} objectsIds={objectsIds} /> */}
            <CopyLink className="copy-btn" link={window.location.href} />
          </div>
          <div className="action-btns flex items-center">
            <ChatButton />
            <FilterButton
              filters={filters}
              onChangeFilter={onChangeFilter}
              filtersFields={filtersFields}
              onApplyFilter={onApplyFilter}
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
    width: 255px;
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
