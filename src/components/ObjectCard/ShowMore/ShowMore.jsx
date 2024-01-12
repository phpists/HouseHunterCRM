import styled from "styled-components";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";
import { useState } from "react";

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
}) => {
  const [isFocusedBtn, setIsFocusedBtn] = useState(false);

  return (
    <StyledShowMore isFocusedBtn={isFocusedBtn}>
      <Button onChangeFocus={(val) => setIsFocusedBtn(val)} />
      <Dropdown
        clientId={clientId}
        id={id}
        onToggleFavoriteStatus={onToggleFavoriteStatus}
        isFavorite={isFavorite}
        onFindSimilar={onFindSimilar}
        isEdit={isEdit}
        onHide={onHide}
        onAddToSelection={onAddToSelection}
        onOpenTagsHistory={onOpenTagsHistory}
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
