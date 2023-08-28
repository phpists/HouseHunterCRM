import { styled } from "styled-components";
import { Title } from "./Title";
import { CreateButton } from "./CreateButton";
import { Filter } from "./Filter/Filter";
import { Search } from "./Search";
import { Selected } from "./Selected";

export const Header = ({ tarifSelected, selectedWorkers }) => (
  <StyledHeader className="flex items-center justify-between">
    <div className="flex items-center">
      <Title />
      {tarifSelected ? (
        <Selected
          price={tarifSelected?.price ?? 0}
          selected={selectedWorkers.length}
        />
      ) : null}
    </div>
    <div className="flex items-center">
      <CreateButton />
      <Filter />
      <Search />
    </div>
  </StyledHeader>
);

const StyledHeader = styled.div`
  padding: 18px 20px 19px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
`;
