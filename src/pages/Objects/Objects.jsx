import styled from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List";
import { useState } from "react";

export const Objects = () => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (index) =>
    setSelected(
      !!selected.find((i) => i === index)
        ? selected.filter((i) => i !== index)
        : [...selected, index]
    );

  return (
    <StyledObjects>
      <Header selectedCount={selected.length} />
      <List selected={selected} onSelect={handleSelect} />
    </StyledObjects>
  );
};

const StyledObjects = styled.div`
  padding: 15px 20px;
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  position: relative;
`;
