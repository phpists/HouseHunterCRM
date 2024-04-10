import { ReactComponent as SearchIcon } from "../../../../assets/images/search.svg";
import { IconButton } from "../../../../components/IconButton";
import { Filter } from "../Filter/Filter";
import { useState } from "react";

export const Search = ({
  filter,
  onChangeFilter,
  searchPhoneCode,
  onChangeSearchCode,
  onApplyFilters,
  searchPhoneCodeSecond,
  onChangeSearchCodeSecond,
  favoritesFilter,
}) => {
  const [open, setOpen] = useState(false);
  const prevClientsFilters = localStorage.getItem("clientsFilters");

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
          searchPhoneCode={searchPhoneCode}
          onChangeSearchCode={onChangeSearchCode}
          onApplyFilters={onApplyFilters}
          searchPhoneCodeSecond={searchPhoneCodeSecond}
          onChangeSearchCodeSecond={onChangeSearchCodeSecond}
          favoritesFilter={favoritesFilter}
        />
      )}
    </div>
  );
};
