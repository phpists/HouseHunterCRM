import { IconButton } from "../../../../components/IconButton";
import { ReactComponent as StarIcon } from "../../../../assets/images/card-star.svg";
import { ReactComponent as PlusIcon } from "../../../../assets/images/plus.svg";
import { Search } from "./Search";
import { Select } from "./Select/Select";
import { styled } from "styled-components";

export const Buttons = ({ favoritesFilter, onToggleFavoriteFilter }) => {
  return (
    <StyledButtons className="flex items-center">
      <IconButton Icon={PlusIcon} onClick={null} className="icon-btn" />
      <IconButton
        Icon={StarIcon}
        onClick={onToggleFavoriteFilter}
        className="icon-btn"
        active={favoritesFilter}
      />
      <Search />
      <Select />
    </StyledButtons>
  );
};

const StyledButtons = styled.div`
  .icon-btn {
    border: 2px solid rgba(255, 255, 255, 0.2) !important;
    margin-right: 15px;
    &:hover {
      border: 2px solid transparent !important;
    }
  }
`;
