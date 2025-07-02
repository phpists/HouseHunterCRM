import styled from "styled-components";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent";
import { memo, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Photo } from "./Photo";
import { CarMainInfo } from "./CarMainInfo";
import { ShowMore } from "./ShowMore/ShowMore";
import { CarInfo } from "./CarInfo";
import { checkIsArray, checkIsJSON } from "../../utilits";
import { useNavigate } from "react-router-dom";

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
    ad,
    onUpdateField,
    onDeleteHistory,
    onDeleteAd,
    onOpenAdList,
    noEdit,
    onOpenInfo,
    onOpenCommentAutoria,
  }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 801);
    const { ref, inView } = useInView({ triggerOnce: window.innerWidth < 801 });
    const navigate = useNavigate();

    const handleClick = (e) => {
      const isInteractive =
        e.target.closest("a") ||
        e.target.closest("button") ||
        e.target.classList.contains("notClickable") ||
        e.target.closest(".notClickable");

      if (!isInteractive) {
        window.open(`/car/${data.id}`, "_blank");
      }
    };

    // const handleClick = (e) =>
    //   e.target.classList.contains("clickable") && onSelect();

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
        ref={ref}
      >
        <Photo
          photos={
            checkIsArray(checkIsJSON(data?.photo_links_json))?.length > 0
              ? checkIsArray(checkIsJSON(data?.photo_links_json))
              : checkIsArray(checkIsJSON(data?.photos_json))
          }
        />
        <CarMainInfo
          onClick={handleClick}
          data={data}
          onOpenPriceHistory={onOpenPriceHistory}
        />
        <CarInfo
          data={data}
          onOpenInfo={onOpenInfo}
          onUpdateField={onUpdateField}
          noEdit={noEdit}
          onChangeTags={onChangeTags}
        />
        <ShowMore
          clientId={data?.id_client}
          id={data?.id}
          onToggleFavoriteStatus={onToggleFavoriteStatus}
          isFavorite={data?.favorite}
          onFindSimilar={onFindSimilar}
          isEdit={isEdit}
          onHide={onHide}
          onAddToSelection={onAddToSelection}
          onOpenTagsHistory={onOpenTagsHistory}
          onOpenPriceHistory={onOpenPriceHistory}
          isAccess={data?.acsses_change}
          link={data?.link ?? data?.url_resource}
          isHideObjects={isHideObjects}
          onOpenCommetHistory={onOpenCommetHistory}
          onDelete={onDelete}
          isStreetBase={data?.obj_street_base === "1"}
          searchTag={searchTag}
          onMarkPhone={onMarkPhone}
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
          idRubric={data?.id_rubric}
          onOpenCommentAutoria={onOpenCommentAutoria}
          onOpenPhonesModal={onOpenPhonesModal}
          commentAutoria={data?.comment_autoria}
        />
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
  display: grid;
  grid-template-columns: max-content minmax(300px, 400px) 1fr max-content;
  gap: 20px;
  width: 100%;
  @media (max-width: 1110px) {
    grid-template-columns: 230px 1fr;
    padding-right: 50px;
  }
  /* min-height: 160px; */
`;
