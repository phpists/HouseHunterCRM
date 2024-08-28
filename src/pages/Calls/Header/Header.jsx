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
import { SendModal } from "../../Clients/SendModal";
import { SendCall } from "../List/SendCall";

export const Header = ({
  selectedCount,
  filters,
  onChangeFilter,
  onApplyFilter,
  onSetCallsStatus,
  onSelectAll,
  allCount,
  clients,
  filterPhoneCode,
  onChangeFilterPhoneCode,
  onSendSuccess,
  calls,
  showTelegram,
  telegramCalls,
  refreshTelegramCalls,
  orders,
  activeType,
  onChangeActiveType,
  ordersTypes,
}) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [addClientOpen, setAddClientOpen] = useState(false);
  const prevFilters = localStorage.getItem("callsFilter");
  const [sendModal, setSendModal] = useState(false);

  const handleSendSelected = () => setSendModal(true);

  return (
    <StyledHeader>
      {sendModal && (
        <SendCall
          clients={clients?.filter((c) => !!c)}
          calls={calls}
          onClose={() => setSendModal(false)}
          onSendSuccess={() => {
            setSendModal(false);
            onSendSuccess();
          }}
          telegramCalls={telegramCalls}
          orders={orders}
          massiveAction
        />
      )}
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
              allowSelectAll
              dropdown={
                <SelectItemsDropdown
                  onSetCallsStatus={onSetCallsStatus}
                  status={filters?.status}
                  onSend={selectedCount > 0 ? handleSendSelected : null}
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
        allowSelectAll
        dropdown={
          <SelectItemsDropdown
            onSetCallsStatus={onSetCallsStatus}
            status={filters?.status}
            onSend={
              clients?.filter((c) => !!c)?.length > 0
                ? handleSendSelected
                : null
            }
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
          filterPhoneCode={filterPhoneCode}
          onChangeFilterPhoneCode={onChangeFilterPhoneCode}
          showTelegram={showTelegram}
          activeType={activeType}
          onChangeActiveType={onChangeActiveType}
          ordersTypes={ordersTypes}
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
