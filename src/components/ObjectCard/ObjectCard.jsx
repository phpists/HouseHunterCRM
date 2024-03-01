import styled from "styled-components";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent";
import { memo, useEffect, useState } from "react";

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
  }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 801);

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
        className={` clickable ${selected && "selected"}`}
        onClick={handleClick}
      >
        {!isMobile ? (
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
            isHideObjects={isHideObjects}
            onOpenCommetHistory={onOpenCommetHistory}
            onDelete={onDelete}
            searchTag={searchTag}
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
            isHideObjects={isHideObjects}
            onOpenCommetHistory={onOpenCommetHistory}
            onDelete={onDelete}
            searchTag={searchTag}
          />
        )}
      </StyledObjectCard>
    );
  }
);

const StyledObjectCard = styled.div`
  padding: 10px;
  border-radius: 10px;
  background: #3d3d3d;
  position: relative;
  border: 1px solid transparent;
  cursor: pointer;
  &.selected {
    border: 1px solid #fff;
  }
  @media (min-width: 1400px) {
    padding: 20px;
  }
`;
