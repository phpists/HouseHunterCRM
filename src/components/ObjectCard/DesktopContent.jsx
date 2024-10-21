import styled from "styled-components";
import { Slider } from "./Slider/Slider";
import { MainInfo } from "./MainInfo/MainInfo";
import { Info } from "./Info/Info";
import { Tags } from "./Tags/Tags";
import { Contacts } from "./Contacts/Contacts";
import { ShowMore } from "./ShowMore/ShowMore";
import { useState } from "react";
import { checkIsArray } from "../../utilits";

export const DesktopContent = ({
  data,
  onToggleFavoriteStatus,
  onFindSimilar,
  isEdit,
  onHide,
  onAddToSelection,
  onOpenTagsHistory,
  onOpenPriceHistory,
  isHideObjects,
  onOpenCommetHistory,
  onDelete,
  searchTag,
  showLike,
  onChangeComment,
  currency,
  onChangeCurrency,
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
  ad,
  onUpdateField,
  onDeleteHistory,
  onDeleteAd,
  onOpenAdList,
  noEdit,
}) => {
  return (
    <StyledDesktopContent className="flex items-center justify-between clickable">
      <Slider
        photos={[...checkIsArray(data?.img)]?.sort(
          (a, b) => b?.cover - a?.cover
        )}
        data={data}
        showLike={showLike}
      />
      <MainInfo
        data={data}
        currency={currency}
        onChangeCurrency={onChangeCurrency}
        type={type}
        onChangeType={onChangeType}
        ad={ad}
      />
      <Info
        className="desktop-item"
        data={data}
        editable={editable}
        onEdit={onEdit}
        ad={ad}
        onOpenAdList={onOpenAdList}
      />
      <Tags
        data={data}
        onChangeComment={onChangeComment}
        selections={selections}
        onChangeTags={onChangeTags}
        ad={ad}
        onUpdateField={onUpdateField}
        noEdit={noEdit}
      />
      <Contacts
        className="desktop-item"
        data={data}
        showContactId={showContactId}
        onShowContact={onShowContact}
        onOpenPhonesModal={onOpenPhonesModal}
        showClientObjectsCount={showClientObjectsCount}
        ad={ad}
      />
      {noEdit ? null : (
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
        />
      )}
      <div className="mobile-footer w-full">
        <Info
          data={data}
          editable={editable}
          onEdit={onEdit}
          ad={ad}
          onOpenAdList={onOpenAdList}
        />
        <Contacts
          data={data}
          showContactId={showContactId}
          onShowContact={onShowContact}
          onOpenPhonesModal={onOpenPhonesModal}
        />
      </div>
    </StyledDesktopContent>
  );
};
const StyledDesktopContent = styled.div`
  height: max-content;
  display: grid;
  grid-template-columns: repeat(5, max-content);
  justify-content: space-between;
  .mobile-footer {
    display: none;
    margin-top: 10px;
    grid-template-columns: 1fr max-content;
    gap: 10px;
  }

  @media (max-width: 1399.9px) {
    display: flex;
    flex-wrap: wrap;
    .desktop-item {
      display: none;
    }
    .mobile-footer {
      display: grid;
    }
  }
  @media (max-width: 801px) {
    display: none;
  }
`;
