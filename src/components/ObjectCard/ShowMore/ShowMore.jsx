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

  return (
    <StyledShowMore isFocusedBtn={isFocusedBtn} ref={moreRef}>
      <Button onChangeFocus={(val) => setIsFocusedBtn(val)} />
      <Dropdown
        clientId={clientId}
        id={id}
        onToggleFavoriteStatus={onToggleFavoriteStatus}
        isFavorite={isFavorite}
        onFindSimilar={handleFindSimilar}
        isEdit={isEdit && isAccess}
        onHide={onHide}
        onAddToSelection={onAddToSelection}
        onOpenTagsHistory={onOpenTagsHistory}
        onOpenPriceHistory={onOpenPriceHistory}
        link={link}
        isHideObjects={isHideObjects}
        onOpenCommetHistory={onOpenCommetHistory}
        onDelete={onDelete && isAccess ? handleDelete : null}
      />
    </StyledShowMore>
  );
};

const StyledShowMore = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  ${({ isFocusedBtn }) =>
    isFocusedBtn &&
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
