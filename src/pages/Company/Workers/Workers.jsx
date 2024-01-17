import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List/List";
import { EditWorker } from "./EditWorker/EditWorker";
import { useEffect, useState } from "react";
import { useGetDirectorWorkersQuery } from "../../../store/billing/billing.api";
import { WorkerModal } from "../../Structure/WorkerModal";

export const Workers = ({ tarifSelected, selectedWorkers, onSelect }) => {
  const [editOpen, setEditOpen] = useState(false);
  const { data, refetch } = useGetDirectorWorkersQuery();
  const [workers, setWorkers] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
    billing: false,
    active: false,
    roles: [],
  });

  const handleChangeFilter = (fieldName, value) =>
    setFilter({ ...filter, [fieldName]: value });

  useEffect(() => {
    if (tarifSelected) {
      setEditOpen(false);
      refetch();
    }
  }, [tarifSelected]);

  useEffect(() => {
    setWorkers(
      data
        ? Object.entries(data)
            ?.filter((w) => w[0] !== "error")
            ?.map((w) => w[1])
        : []
    );
  }, [data]);

  const handleFilter = () =>
    workers
      ?.filter(({ first_name, last_name }) =>
        filter?.search?.length > 0
          ? `${first_name ?? ""} ${last_name ?? ""}`
              .toLowerCase()
              .includes(filter?.search?.toLowerCase())
          : true
      )
      ?.filter(({ active }) => (filter?.active ? active === "1" : true))
      ?.filter(({ billing_to }) =>
        filter?.billing
          ? Number(billing_to) * 1000 > new Date()?.getTime()
          : true
      )
      ?.filter(({ struct_level }) =>
        filter?.roles?.length > 0
          ? !!filter.roles?.find(
              (r) => 1 + Number(r) === (struct_level === 0 ? 1 : struct_level)
            )
          : true
      );

  return (
    <StyledWorkers>
      <Header
        tarifSelected={tarifSelected}
        selectedWorkers={selectedWorkers}
        filter={filter}
        onFilterChange={handleChangeFilter}
      />
      <List
        onOpenEdit={setEditOpen}
        tarifSelected={tarifSelected}
        selectedWorkers={selectedWorkers}
        onSelect={onSelect}
        workers={handleFilter()}
        filter={filter}
      />
      {editOpen && (
        <WorkerModal
          workerId={editOpen?.id}
          onClose={() => setEditOpen(false)}
          level={1}
          onRefetchData={refetch}
          noStructure
          showPayHistory
          worker
        />
      )}
    </StyledWorkers>
  );
};

const StyledWorkers = styled.div`
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  height: max-content;
  @media (max-width: 1500px) {
    position: relative;
  }
`;
