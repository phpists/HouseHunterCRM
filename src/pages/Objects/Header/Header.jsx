import styled from "styled-components";
import { Title } from "./Title";
import { IconButton } from "../../../components/IconButton";
import { ReactComponent as SettingIcon } from "../../../assets/images/setting.svg";
import { ReactComponent as PlusIcon } from "../../../assets/images/plus.svg";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { SelectItems } from "../../../components/SelectItems/SelectItems";
import { Filter } from "./Filter/Filter";
import { useState } from "react";

export const Header = ({ selectedCount }) => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <StyledHeader>
      <div className="flex items-center justify-between">
        <Title selectedCount={selectedCount} />
        <div className="flex items-center bts">
          <IconButton
            Icon={SettingIcon}
            className="icon-btn"
            active={filterOpen}
            onClick={() => setFilterOpen(true)}
          />
          <IconButton Icon={PlusIcon} className="icon-btn" />
          <IconButton Icon={StarIcon} className="icon-btn icon-btn-last" />
          <div className="select-wrapper flex items-center justify-end">
            <SelectItems title="об'єктів" selectedCount={selectedCount} />
          </div>
        </div>
      </div>
      <div className="select-wrapper-mobile">
        <SelectItems
          title="об'єктів"
          selectedCount={selectedCount}
          className="mobile-select"
        />
      </div>
      {filterOpen && <Filter onClose={() => setFilterOpen(false)} />}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 20px;
  .icon-btn {
    margin-right: 15px;
  }

  .select-wrapper {
    width: 250px;
  }

  .select-wrapper-mobile {
    display: none;
  }
  @media (max-width: 600px) {
    .select-wrapper {
      display: none;
    }
    .icon-btn-last {
      margin-right: 0px;
    }
    .select-wrapper-mobile {
      display: block;
      margin-top: 20px;
    }
    .mobile-select {
      width: 100%;
      justify-content: space-between;
    }
  }
`;
