import { Button } from "./Button";
import { ReactComponent as StarIcon } from "../../../../assets/images/card-star.svg";
import { ReactComponent as PlusIcon } from "../../../../assets/images/plus.svg";
import { Search } from "./Search";
import { Select } from "./Select/Select";

export const Buttons = ({ favoritesFilter, onToggleFavoriteFilter }) => {
  return (
    <div className="flex items-center">
      <Button Icon={PlusIcon} onClick={null} className="mr-2.5" />
      <Button
        Icon={StarIcon}
        onClick={onToggleFavoriteFilter}
        className="mr-2.5"
        active={favoritesFilter}
      />
      <Search />
      <Select />
    </div>
  );
};
