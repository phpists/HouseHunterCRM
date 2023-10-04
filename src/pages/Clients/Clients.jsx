import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List/List";
import { useState } from "react";

export const Clients = () => {
  const [favoritesFilter, setFavoritesFilter] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleSelectClient = (index) => {
    const isExist = selected.find((w) => w === index);
    setSelected(
      !!isExist ? selected.filter((w) => w !== index) : [...selected, index]
    );
  };

  return (
    <StyledClients>
      <Header
        favoritesFilter={favoritesFilter}
        onToggleFavoriteFilter={() => setFavoritesFilter(!favoritesFilter)}
      />
      <List selected={selected} onSelect={handleSelectClient} />
    </StyledClients>
  );
};

const StyledClients = styled.div`
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  width: 100%;
  padding: 18px 20px 14px;
  @media (max-width: 850px) {
    width: 100svw;
    margin-left: -24px;
    padding: 20px 24px;
  }
`;
