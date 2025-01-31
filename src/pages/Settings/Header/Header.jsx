import { styled } from "styled-components";
import { Title } from "./Title";
import { Buttons } from "./Buttons/Buttons";
import { BackButton } from "./BackButton";

export const Header = ({
  onRefreshData,
  filter,
  onChangeFilter,
  onApplyFilters,
  onCreate,
  onBack,
}) => {
  return (
    <StyledHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {onBack ? <BackButton onClick={onBack} /> : null}
          <Title title={`Локації`} />
          {/* {favoritesFilter && <Subtitle subtitle="54 обрано" />} */}
        </div>
        <Buttons
          onRefreshData={onRefreshData}
          filter={filter}
          onChangeFilter={onChangeFilter}
          onApplyFilters={onApplyFilters}
          onCreate={onCreate}
        />
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 18px;
  position: relative;
  .select-wrapper-mobile {
    width: 100%;
    justify-content: space-between;
    margin-top: 20px;
  }
  @media (min-width: 850px) {
    .select-wrapper-mobile {
      display: none;
    }
  }
`;
