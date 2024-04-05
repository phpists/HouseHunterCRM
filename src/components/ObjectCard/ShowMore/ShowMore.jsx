import styled from "styled-components";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";
import { useRef, useState } from "react";

export const ShowMore = ({
  clientId,
  id,
  onToggleFavoriteStatus,
  isFavorite,
  onFindSimilar,
  isEdit,
  onHide,
  onAddToSelection,
  onOpenTagsHistory,
  onOpenPriceHistory,
  isAccess,
  link,
  isHideObjects,
  onOpenCommetHistory,
  onDelete,
  isStreetBase,
  searchTag,
  onMarkPhone,
  isDeleted,
  onRestore,
  onDeleteFinally,
}) => {
  const [isFocusedBtn, setIsFocusedBtn] = useState(false);
  const moreRef = useRef(null);

  const handleCloseDropdown = () => moreRef.current.blur();

  const handleFindSimilar = () => {
    onFindSimilar();
    handleCloseDropdown();
  };

  const handleDelete = () => {
    onDelete && onDelete();
    handleCloseDropdown();
  };

  const handleFocus = () => moreRef.current.focus();

  if (isDeleted && !onRestore && !onDelete) {
    return null;
  }

  return (
    <StyledShowMore isfocusedbtn={isFocusedBtn?.toString()} ref={moreRef}>
      <Button onChangeFocus={(val) => setIsFocusedBtn(val)} />
      <Dropdown
        clientId={clientId}
        id={id}
        onToggleFavoriteStatus={onToggleFavoriteStatus}
        isFavorite={isFavorite}
        onFindSimilar={onFindSimilar ? handleFindSimilar : null}
        isEdit={isEdit && isAccess}
        onHide={onHide}
        onAddToSelection={onAddToSelection}
        onOpenTagsHistory={onOpenTagsHistory}
        onOpenPriceHistory={onOpenPriceHistory}
        link={link}
        isHideObjects={isHideObjects}
        onOpenCommetHistory={onOpenCommetHistory}
        onDelete={onDelete && isAccess ? handleDelete : null}
        isStreetBase={isStreetBase}
        searchTag={searchTag}
        onFocus={handleFocus}
        onMarkPhone={onMarkPhone}
        onClose={handleCloseDropdown}
        isDeleted={isDeleted}
        onRestore={onRestore}
        onDeleteFinally={onDeleteFinally}
      />
    </StyledShowMore>
  );
};

const StyledShowMore = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  ${({ isfocusedbtn }) =>
    isfocusedbtn === "true" &&
    `
   .dropdown {
      opacity: 1;
      visibility: visible;
    }
`}
  &:focus  .dropdown {
    opacity: 1;
    visibility: visible;
  }
`;
