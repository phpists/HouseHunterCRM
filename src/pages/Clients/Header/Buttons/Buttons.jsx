import { IconButton } from "../../../../components/IconButton";
import { ReactComponent as StarIcon } from "../../../../assets/images/card-star.svg";
import { ReactComponent as PlusIcon } from "../../../../assets/images/plus.svg";
import { Search } from "./Search";
import { styled } from "styled-components";
import { SelectItems } from "../../../../components/SelectItems/SelectItems";
import { useState } from "react";
import { AddClient } from "../../../../components/AddClient/AddClient";

export const Buttons = ({ favoritesFilter, onToggleFavoriteFilter }) => {
  const [addClient, setAddClient] = useState(false);

  return (
    <StyledButtons className="flex items-center">
      {addClient && <AddClient onClose={() => setAddClient(false)} />}
      <IconButton
        Icon={PlusIcon}
        className="icon-btn"
        onClick={() => setAddClient(true)}
      />
      <IconButton
        Icon={StarIcon}
        onClick={onToggleFavoriteFilter}
        className="icon-btn"
        active={favoritesFilter}
      />
      <Search />
      <SelectItems title="клієнтів" className="select-wrapper-desktop" />
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

  @media (max-width: 850px) {
    .select-wrapper-desktop {
      display: none;
    }
    .icon-btn--last {
      margin: 0;
    }
  }
`;
