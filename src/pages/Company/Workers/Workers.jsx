import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List/List";
import { EditWorker } from "./EditWorker/EditWorker";
import { useEffect, useState } from "react";

export const Workers = ({ tarifSelected, selectedWorkers, onSelect }) => {
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (tarifSelected) {
      setEditOpen(false);
    }
  }, [tarifSelected]);

  return (
    <StyledWorkers>
      <Header tarifSelected={tarifSelected} selectedWorkers={selectedWorkers} />
      <List
        onOpenEdit={() => setEditOpen(true)}
        tarifSelected={tarifSelected}
        selectedWorkers={selectedWorkers}
        onSelect={onSelect}
      />
      {editOpen && <EditWorker onClose={() => setEditOpen(false)} />}
    </StyledWorkers>
  );
};

const StyledWorkers = styled.div`
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  height: max-content;
`;
