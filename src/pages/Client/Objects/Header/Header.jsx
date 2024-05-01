import { styled } from "styled-components";
import { Title } from "./Title";
import { SelectItems } from "../../../../components/SelectItems/SelectItems";

export const Header = ({
  requestsCount,
  objectsCount,
  selectedCount,
  onDelete,
  onToggleFavorite,
  onSelectAll,
  onDeleteFinally,
  onRestore,
}) => {
  return (
    <StyledHeader className="flex items-center justify-between">
      <Title requestsCount={requestsCount} objectsCount={objectsCount} />
      <div className="flex items-center header-btns">
        {/* <Filter className="header-btn" /> */}
        {/* <Search open={isSearch} onOpen={() => setIsSearch(true)} /> */}
        <SelectItems
          selectedCount={selectedCount}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
          noFavorite={!onToggleFavorite}
          allCount={objectsCount + requestsCount}
          title="Обрано"
          deleteConfirmTitle="Видалити обрані заявку(ки)/ об'єкт(и)?"
          finalDeleteConfirmTitle="Видалити обрані заявку(ки)/ об'єкт(и) остаточно?"
          onSelectAll={onSelectAll}
          onDeleteFinally={onDeleteFinally}
          onRestore={onRestore}
        />
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  padding: 10px 10px 11px 18px;
  border-bottom: 1px solid var(--bg-10);
  .header-btn {
    margin-right: 15px;
  }

  @media (max-width: 1400px) {
    margin: 10px 0;
  }

  @media (max-width: 700px) {
    padding: 20px 0;
    margin: 10px 0;

    .header-btns {
      display: none;
    }
  }
`;
