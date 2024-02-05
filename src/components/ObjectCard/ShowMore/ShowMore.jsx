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
}) => {
  const [isFocusedBtn, setIsFocusedBtn] = useState(false);
  const moreRef = useRef(null);

  const handleCloseDropdown = () => moreRef.current.blur();

  const handleFindSimilar = () => {
    onFindSimilar();
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
