import { styled } from "styled-components";
import { Title } from "./Title";
import { Filter } from "../../../../components/Filter/Filter";
import { Search } from "./Search";
import { Select } from "./Select/Select";
import { useState } from "react";

export const Header = ({
  requestsCount,
  objectsCount,
  selectedCount,
  onDelete,
  onToggleFavorite,
}) => {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <StyledHeader className="flex items-center justify-between">
      <Title requestsCount={requestsCount} objectsCount={objectsCount} />
      <div className="flex items-center header-btns">
        {/* <Filter className="header-btn" /> */}
        {/* <Search open={isSearch} onOpen={() => setIsSearch(true)} /> */}
        <Select
          open={!isSearch}
          onOpen={() => setIsSearch(false)}
          selectedCount={selectedCount}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  padding: 10px 10px 11px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  .header-btn {
    margin-right: 15px;
  }

  @media (max-width: 700px) {
    padding: 20px 0;
    margin-bottom: 10px;

    .header-btns {
      display: none;
    }
  }
`;
