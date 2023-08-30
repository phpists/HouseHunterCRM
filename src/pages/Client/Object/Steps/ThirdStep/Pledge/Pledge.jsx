import { useState } from "react";
import { styled } from "styled-components";
import { Empty } from "./Empty";
import { List } from "./List";

export const Pledge = () => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (value) =>
    setSelected(
      selected.find((v) => v.value === value.value)
        ? selected.filter((v) => v.value !== value.value)
        : [...selected, value]
    );

  return (
    <StyledPledge>
      {selected?.length === 0 ? (
        <Empty onSelect={handleSelect} />
      ) : (
        <List selected={selected} onSelect={handleSelect} />
      )}
    </StyledPledge>
  );
};

const StyledPledge = styled.div``;
