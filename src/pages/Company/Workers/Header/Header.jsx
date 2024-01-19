import { styled } from "styled-components";
import { Title } from "./Title";
import { CreateButton } from "./CreateButton";
import { Search } from "./Search";
import { Selected } from "./Selected";
import { Filter } from "../../../../components/Filter/Filter";

export const Header = ({
  tarifSelected,
  selectedWorkers,
  filter,
  onFilterChange,
  count,
}) => (
  <StyledHeader className="flex items-center justify-between">
    <div className="flex items-center">
      <Title count={count} />
      {tarifSelected ? (
        <Selected
          price={tarifSelected?.price ?? 0}
          selected={selectedWorkers.length}
        />
      ) : null}
    </div>
    <div className="flex items-center">
      {/* <CreateButton /> */}
      <Filter
        className="mr-4 filter-wrapper"
        filter={filter}
        onFilterChange={onFilterChange}
      />
      <Search
        value={filter?.search}
        onChange={(val) => onFilterChange("search", val)}
      />
    </div>
  </StyledHeader>
);

const StyledHeader = styled.div`
  padding: 18px 20px 19px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);

  @media (max-width: 800px) {
    .filter-wrapper {
      display: none;
    }
  }
`;
