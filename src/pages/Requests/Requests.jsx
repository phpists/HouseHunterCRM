import styled from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List/List";
import { useState } from "react";

export const Requests = () => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (index) =>
    setSelected(
      !!selected.find((i) => i === index)
        ? selected.filter((i) => i !== index)
        : [...selected, index]
    );

  return (
    <StyledRequests>
      <Header selectedCount={selected.length} />
      <List selected={selected} onSelect={handleSelect} />
    </StyledRequests>
  );
};

const StyledRequests = styled.div`
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  padding: 15px 20px;
  position: relative;
  @media (max-width: 700px) {
    width: 100svw;
    margin-left: -24px;
    padding: 20px 24px;
  }
`;
