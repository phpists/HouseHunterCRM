import styled from "styled-components";
import { Slider } from "./Slider/Slider";
import { MainInfo } from "./MainInfo/MainInfo";
import { Info } from "./Info/Info";
import { Tags } from "./Tags/Tags";
import { Contacts } from "./Contacts/Contacts";
import { ShowMore } from "./ShowMore/ShowMore";

export const DesktopContent = ({
  data,
  onToggleFavoriteStatus,
  onFindSimilar,
  isEdit,
  onHide,
  onAddToSelection,
  onOpenTagsHistory,
}) => (
  <StyledDesktopContent className="flex items-center justify-between">
    <Slider photos={[...data?.img]?.sort((a, b) => b.cover - a.cover)} />
    <MainInfo data={data} />
    <Info className="desktop-item" data={data} />
    <Tags data={data} />
    <Contacts className="desktop-item" data={data} />
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
    />
    <div className="mobile-footer w-full">
      <Info data={data} />
      <Contacts data={data} />
    </div>
  </StyledDesktopContent>
);

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
