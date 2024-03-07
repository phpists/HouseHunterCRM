import styled from "styled-components";
import { Header } from "./Info/Header/Header";
import { CardTitle } from "./CardTitle";
import { Slider } from "./Slider/Slider";
import { CardDescription } from "./CardDescription";
import { Footer } from "./Info/Footer/Footer";
import { MainInfo } from "./MainInfo/MainInfo";
import { Tags } from "./Tags/Tags";
import { Contacts } from "./Contacts/Contacts";
import { ShowMore } from "./ShowMore/ShowMore";

export const MobileContent = ({
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
}) => (
  <StyledMobileContent>
    <Header />
    <CardTitle title={data?.title} />
    <Slider
      photos={[...data?.img]?.sort((a, b) => b.cover - a.cover)}
      data={data}
      showLike={showLike}
    />
    <CardDescription text={data?.description} />
    <Footer createDate={data?.dt_add} />
    <MainInfo
      className="mobile-main-info"
      data={data}
      currency={currency}
      onChangeCurrency={onChangeCurrency}
    />
    <Tags className="mobile-tags" data={data} />
    <Contacts data={data} />
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
      link={data?.link}
      isHideObjects={isHideObjects}
      onOpenCommetHistory={onOpenCommetHistory}
      onDelete={onDelete}
      isStreetBase={data?.obj_street_base === "1"}
      searchTag={searchTag}
    />
  </StyledMobileContent>
);

const StyledMobileContent = styled.div`
  .mobile-main-info {
    width: 100%;
    margin: 10px 0;
    height: max-content;
  }
  .mobile-tags {
    width: 100%;
    margin-bottom: 10px;
    height: 170px;
  }
  @media (min-width: 801px) {
    display: none;
  }
`;
