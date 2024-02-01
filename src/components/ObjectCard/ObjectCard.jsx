import styled from "styled-components";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent";

export const ObjectCard = ({
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
}) => {
  const handleClick = (e) =>
    e.target.classList.contains("clickable") && onSelect();

  return (
    <StyledObjectCard
      className={` clickable ${selected && "selected"}`}
      onClick={handleClick}
    >
      <DesktopContent
        data={data}
        onToggleFavoriteStatus={onToggleFavoriteStatus}
        onFindSimilar={onFindSimilar}
        isEdit={isEdit}
        onHide={onHide}
        onAddToSelection={onAddToSelection}
        onOpenTagsHistory={onOpenTagsHistory}
        onOpenPriceHistory={onOpenPriceHistory}
      />
      <MobileContent
        data={data}
        onToggleFavoriteStatus={onToggleFavoriteStatus}
        onFindSimilar={onFindSimilar}
        isEdit={isEdit}
        onHide={onHide}
        onAddToSelection={onAddToSelection}
        onOpenTagsHistory={onOpenTagsHistory}
        onOpenPriceHistory={onOpenPriceHistory}
      />
    </StyledObjectCard>
  );
};

const StyledObjectCard = styled.div`
  padding: 10px;
  border-radius: 10px;
  background: #3d3d3d;
  position: relative;
  transition: all 0.1s;
  border: 1px solid transparent;
  cursor: pointer;
  &.selected {
    border: 1px solid #fff;
  }
  @media (min-width: 1400px) {
    padding: 20px;
  }
`;
