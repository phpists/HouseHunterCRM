import styled from "styled-components";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent";
import { memo, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const ObjectCard = memo(
  ({
    selected,
    onSelect,
    data,
    onToggleFavoriteStatus,
    onFindSimilar,
    isEdit,
    onHide,
    onAddToSelection,
    onOpenTagsHistory,
    onOpenPriceHistory,
    currency,
    onChangeCurrency,
    isHideObjects,
    onOpenCommetHistory,
    onDelete,
    searchTag,
    showLike,
    onChangeComment,
    type,
    onChangeType,
    selections,
    onMarkPhone,
    isDeleted,
    onRestore,
    onDeleteFinally,
    showContactId,
    onShowContact,
    onChangeTags,
    editable,
    onEdit,
    onOpenPhonesModal,
    showClientObjectsCount,
    onOpenDeleteReason,
    onFastSelection,
    onAdvertise,
    onAdvertiseTelegram,
    telegramAdLoader,
  }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 801);
    const { ref, inView } = useInView({ triggerOnce: false });

    const handleClick = (e) =>
      e.target.classList.contains("clickable") && onSelect();

    const handleResize = () => {
      const currentWidth = window.innerWidth;

      if (isMobile && currentWidth >= 801) {
        setIsMobile(false);
      } else if (!isMobile && currentWidth < 801) {
        setIsMobile(true);
      }
    };

    useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [isMobile]);

    return (
      <StyledObjectCard
        className={` clickable list-card-wrapper ${selected && "selected"} ${
          !inView && "notInView"
        }`}
        onClick={handleClick}
        ref={ref}
      >
        {!inView ? null : !isMobile ? (
          <DesktopContent
            data={data}
            onToggleFavoriteStatus={onToggleFavoriteStatus}
            onFindSimilar={onFindSimilar}
            isEdit={isEdit}
            onHide={onHide}
            onAddToSelection={onAddToSelection}
            onOpenTagsHistory={onOpenTagsHistory}
            onOpenPriceHistory={onOpenPriceHistory}
            currency={currency}
            onChangeCurrency={onChangeCurrency}
            type={type}
            onChangeType={onChangeType}
            isHideObjects={isHideObjects}
            onOpenCommetHistory={onOpenCommetHistory}
            onDelete={onDelete}
            searchTag={searchTag}
            showLike={showLike}
            onChangeComment={onChangeComment}
            selections={selections}
            onMarkPhone={onMarkPhone}
            isDeleted={isDeleted}
            onRestore={onRestore}
            onDeleteFinally={onDeleteFinally}
            showContactId={showContactId}
            onShowContact={onShowContact}
            onChangeTags={onChangeTags}
            editable={editable}
            onEdit={onEdit}
            onOpenPhonesModal={onOpenPhonesModal}
            showClientObjectsCount={showClientObjectsCount}
            onOpenDeleteReason={onOpenDeleteReason}
            onFastSelection={onFastSelection}
            onAdvertise={onAdvertise}
            onAdvertiseTelegram={onAdvertiseTelegram}
          />
        ) : (
          <MobileContent
            data={data}
            onToggleFavoriteStatus={onToggleFavoriteStatus}
            onFindSimilar={onFindSimilar}
            isEdit={isEdit}
            onHide={onHide}
            onAddToSelection={onAddToSelection}
            onOpenTagsHistory={onOpenTagsHistory}
            onOpenPriceHistory={onOpenPriceHistory}
            currency={currency}
            onChangeCurrency={onChangeCurrency}
            type={type}
            onChangeType={onChangeType}
            isHideObjects={isHideObjects}
            onOpenCommetHistory={onOpenCommetHistory}
            onDelete={onDelete}
            searchTag={searchTag}
            showLike={showLike}
            onChangeComment={onChangeComment}
            selections={selections}
            onMarkPhone={onMarkPhone}
            isDeleted={isDeleted}
            onRestore={onRestore}
            onDeleteFinally={onDeleteFinally}
            showContactId={showContactId}
            onShowContact={onShowContact}
            onChangeTags={onChangeTags}
            editable={editable}
            onEdit={onEdit}
            onOpenPhonesModal={onOpenPhonesModal}
            showClientObjectsCount={showClientObjectsCount}
            onOpenDeleteReason={onOpenDeleteReason}
            onFastSelection={onFastSelection}
            onAdvertise={onAdvertise}
            onAdvertiseTelegram={onAdvertiseTelegram}
          />
        )}
      </StyledObjectCard>
    );
  }
);

const StyledObjectCard = styled.div`
  padding: 10px;
  border-radius: 10px;
  background: var(--card-bg);
  position: relative;
  border: 1px solid transparent;
  cursor: pointer;
  min-height: 200px;
  &.selected {
    border: 1px solid #fff;
  }
  &.notInView {
    min-height: 600px !important;
  }
  @media (min-width: 800px) {
    min-height: 360px;
  }
  @media (min-width: 1000px) {
    &.notInView {
      min-height: 280px !important;
    }
  }
  @media (min-width: 1400px) {
    padding: 20px;
    min-height: 240px;
    &.notInView {
      min-height: 250px !important;
    }
  }
  .tagsSelectDropdown {
    max-height: 150px;
  }
`;
