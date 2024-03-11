import styled from "styled-components";
import { Title } from "./Title";
import { IconButton } from "../../../components/IconButton";
import { ReactComponent as SettingIcon } from "../../../assets/images/search.svg";
import { ReactComponent as PlusIcon } from "../../../assets/images/plus.svg";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { SelectItems } from "../../../components/SelectItems/SelectItems";
import { Filter } from "./Filter/Filter";
import { useState } from "react";
import { AddClient } from "../../../components/AddClient/AddClient";
import { SelectItemsDropdown } from "./SelectItemsDropdown/SelectItemsDropdown";

export const Header = ({
  selectedCount,
  filters,
  onChangeFilter,
  onApplyFilter,
  onSetCallsStatus,
  onSelectAll,
  allCount,
}) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [addClientOpen, setAddClientOpen] = useState(false);
  const prevFilters = localStorage.getItem("callsFilter");

  return (
    <StyledHeader>
      <div className="flex items-center justify-between">
        <Title selectedCount={selectedCount} />
        <div className="flex items-center bts">
          <IconButton
            Icon={SettingIcon}
            className={`icon-btn ${prevFilters && "alert-btn"}`}
            active={filterOpen}
            onClick={() => setFilterOpen(true)}
          />
          <div className="select-wrapper-desktop flex items-center justify-end">
            <SelectItems
              title="дзвінків"
              selectedCount={selectedCount}
              allCount={allCount}
              onSelectAll={onSelectAll}
              dropdown={
                <SelectItemsDropdown
                  onSetCallsStatus={onSetCallsStatus}
                  status={filters?.status}
                />
              }
            />
          </div>
        </div>
      </div>
      <SelectItems
        title="дзвінків"
        selectedCount={selectedCount}
        allCount={allCount}
        onSelectAll={onSelectAll}
        dropdown={
          <SelectItemsDropdown
            onSetCallsStatus={onSetCallsStatus}
            status={filters?.status}
          />
        }
        className="select-wrapper-mobile"
      />
      {filterOpen && (
        <Filter
          onClose={() => setFilterOpen(false)}
          filters={filters}
          onChangeFilter={onChangeFilter}
          onApplyFilter={onApplyFilter}
        />
      )}
      {addClientOpen && <AddClient onClose={() => setAddClientOpen(false)} />}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 20px;
  .icon-btn {
    margin-right: 10px;
  }
  .select-wrapper-mobile {
    display: none;
  }
  @media (max-width: 600px) {
    .icon-btn {
      margin: 0;
    }
    .select-wrapper-desktop {
      display: none;
    }
    .select-wrapper-mobile {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 20px;
    }
  }
`;
