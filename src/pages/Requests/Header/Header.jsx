import styled from "styled-components";
import { Title } from "./Title";
import { IconButton } from "../../../components/IconButton";
import { ReactComponent as SettingIcon } from "../../../assets/images/setting.svg";
import { ReactComponent as PlusIcon } from "../../../assets/images/plus.svg";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { SelectItems } from "../../../components/SelectItems/SelectItems";
import { Filter } from "./Filter/Filter";
import { useState } from "react";
import { AddClient } from "../../../components/AddClient/AddClient";

export const Header = ({ selectedCount }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [addClientOpen, setAddClientOpen] = useState(false);

  return (
    <StyledHeader className="flex items-center justify-between">
      <Title selectedCount={selectedCount} />
      <div className="flex items-center bts">
        <IconButton
          Icon={SettingIcon}
          className="icon-btn"
          active={filterOpen}
          onClick={() => setFilterOpen(true)}
        />
        <IconButton
          Icon={PlusIcon}
          className="icon-btn"
          onClick={() => setAddClientOpen(true)}
        />
        <IconButton Icon={StarIcon} className="icon-btn" />
        <div className="select-wrapper flex items-center justify-end">
          <SelectItems title="об'єктів" selectedCount={selectedCount} />
        </div>
      </div>
      {filterOpen && <Filter onClose={() => setFilterOpen(false)} />}
      {addClientOpen && <AddClient onClose={() => setAddClientOpen(false)} />}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 20px;
  .icon-btn {
    margin-right: 15px;
  }
  .icon-btn-last {
    margin-right: 42px;
  }
  .select-wrapper {
    width: 250px;
  }
`;