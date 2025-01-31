import { ReactComponent as SearchIcon } from "../../../../assets/images/search.svg";
import { IconButton } from "../../../../components/IconButton";
import { Filter } from "../Filter/Filter";
import { useState } from "react";

export const Search = ({ filter, onChangeFilter, onApplyFilters }) => {
  const [open, setOpen] = useState(false);
  const prevClientsFilters = localStorage.getItem("settingsFilters");

  return (
    <div>
      <IconButton
        Icon={SearchIcon}
        onClick={() => setOpen(true)}
        className={`icon-btn icon-btn--last ${
          prevClientsFilters && "alert-btn"
        }`}
      />
      {open && (
        <Filter
          onClose={() => setOpen(false)}
          filter={filter}
          onChangeFilter={onChangeFilter}
          onApplyFilters={onApplyFilters}
        />
      )}
    </div>
  );
};
