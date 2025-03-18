import styled from "styled-components";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";
import { useRef, useState } from "react";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { ReactComponent as PhoneIcon } from "../../../assets/images/phone-menu.svg";
import { ReactComponent as ChatIcon } from "../../../assets/images/chat-grey.svg";
import { ActionButton } from "./ActionButton";

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
  onOpenDeleteReason,
  onFastSelection,
  onAdvertise,
  onAdvertiseTelegram,
  ad,
  onDeleteHistory,
  onDeleteAd,
  idRubric,
  onOpenCommentAutoria,
  onOpenPhonesModal,
  commentAutoria,
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
      <Button onChangeFocus={(val) => setIsFocusedBtn(val)} />{" "}
      {!isDeleted && (
        <ActionButton
          Icon={StarIcon}
          onClick={onToggleFavoriteStatus}
          active={isFavorite}
        />
      )}{" "}
      <ActionButton Icon={PhoneIcon} onClick={onOpenPhonesModal} />{" "}
      {onOpenCommentAutoria && (
        <ActionButton
          Icon={ChatIcon}
          onClick={onOpenCommentAutoria}
          className={`${commentAutoria && "chat-active pulse"}`}
        />
      )}
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
        onOpenDeleteReason={onOpenDeleteReason}
        onFastSelection={onFastSelection}
        onAdvertise={onAdvertise}
        onAdvertiseTelegram={onAdvertiseTelegram}
        ad={ad}
        onDeleteHistory={onDeleteHistory}
        onDeleteAd={onDeleteAd}
        idRubric={idRubric}
      />
    </StyledShowMore>
  );
};

const StyledShowMore = styled.button`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
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
  .chat-active {
    position: relative;
    &::before {
      content: "";
      display: block;
      width: 5px;
      height: 5px;
      border-radius: 100%;
      background: red;
      flex-shrink: 0;
      position: absolute;
      right: 7px;
      top: 6px;
      border: 1px solid #474747;
      box-sizing: content-box;
      animation: alertRed 2s infinite;
    }
  }
  @media (max-width: 1110px) {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;
