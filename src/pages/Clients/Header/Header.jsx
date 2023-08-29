import { styled } from "styled-components";
import { Title } from "./Title";
import { Buttons } from "./Buttons/Buttons";
import { Subtitle } from "./Subtitle";
import { BackButton } from "./BackButton";

export const Header = ({ favoritesFilter, onToggleFavoriteFilter }) => {
  return (
    <StyledHeader className="flex items-center justify-between">
      <div className="flex items-center">
        {favoritesFilter && <BackButton onClick={onToggleFavoriteFilter} />}
        <Title
          title={favoritesFilter ? "Улюблене" : "12 нових клієнтів за сьогодні"}
        />
        {favoritesFilter && <Subtitle subtitle="54 обрано" />}
      </div>
      <Buttons
        favoritesFilter={favoritesFilter}
        onToggleFavoriteFilter={onToggleFavoriteFilter}
      />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 18px;
  position: relative;
`;
