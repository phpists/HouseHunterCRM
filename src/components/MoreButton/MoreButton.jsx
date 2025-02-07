import { styled } from "styled-components";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";
import { Divider } from "./Divider";
import { useRef, useState } from "react";

export const MoreButton = ({
  className,
  onDelete = () => null,
  onFavorite = () => null,
  favorite,
  editLink,
  noFavorite,
  noDelete,
  onSend,
  isDeleted,
  onRestore,
  onDeleteFinally,
  onDownload,
  onOpenDeleteReason,
  urlResource,
  onDeleteHistory,
}) => {
  const [isFocusedBtn, setIsFocusedBtn] = useState(false);

  if (isDeleted && !onSend && noDelete) {
    return false;
  }

  return (
    <div className="relative flex items-center">
      {" "}
      <StyledMoreButton
        className={`flex items-center more noClickable ${className}`}
        isfocusedbtn={isFocusedBtn?.toString()}
      >
        <div className="btn-wrapper relative noClickable">
          <Button onChangeFocus={(val) => setIsFocusedBtn(val)} />
          <Dropdown
            onDelete={onDelete}
            onFavorite={onFavorite}
            favorite={favorite}
            editLink={editLink}
            noFavorite={noFavorite}
            noDelete={noDelete}
            onSend={onSend}
            isDeleted={isDeleted}
            onRestore={onRestore}
            onDeleteFinally={onDeleteFinally}
            onDownload={onDownload}
            onClick
            onOpenDeleteReason={onOpenDeleteReason}
            urlResource={urlResource}
            onDeleteHistory={onDeleteHistory}
          />
        </div>
      </StyledMoreButton>
      <Divider />
    </div>
  );
};

const StyledMoreButton = styled.button`
  position: relative;
  transition: all 0.3s;
  opacity: 0;
  transform: translateX(-10px);
  overflow: hidden;
  ${({ isfocusedbtn }) =>
    isfocusedbtn === "true" &&
    `
      overflow: visible;
   .dropdown {
      opacity: 1;
      visibility: visible;
    }
`}
  &:focus {
    overflow: visible;
    .dropdown {
      opacity: 1;
      visibility: visible;
    }
  }
`;
