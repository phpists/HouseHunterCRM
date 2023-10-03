import styled from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List/List";
import { useState } from "react";

export const Calls = () => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (index) =>
    setSelected(
      !!selected.find((i) => i === index)
        ? selected.filter((i) => i !== index)
        : [...selected, index]
    );

  return (
    <StyledCalls>
      <Header selectedCount={selected.length} />
      <List selected={selected} onSelect={handleSelect} />
    </StyledCalls>
  );
};

const StyledCalls = styled.div`
  position: relative;
  padding: 15px 20px;
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  @media (max-width: 600px) {
    width: 100svw;
    margin-left: -24px;
    padding: 20px 24px;
  }
`;
