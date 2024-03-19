import styled from "styled-components";
import { ReactComponent as SettingsIcon } from "../../../../assets/images/search.svg";
import { useState } from "react";
import { Filter } from "./Filter/Filter";

export const FilterButton = ({
  filters,
  onChangeFilter,
  filtersFields,
  onApplyFilter,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <Filter
          filters={filters}
          onClose={() => setOpen(false)}
          onChangeFilter={onChangeFilter}
          filtersFields={filtersFields}
          onApplyFilter={onApplyFilter}
        />
      )}
      <StyledFilterButton onClick={() => setOpen(!open)}>
        <SettingsIcon />
      </StyledFilterButton>
    </>
  );
};

const StyledFilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-left: 15px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  g {
    transition: all 0.3s;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    g {
      opacity: 1;
    }
  }
  &:active {
    border: 1.2px solid #fff;
  }
`;
