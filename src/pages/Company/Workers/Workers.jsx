import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List/List";
import { EditWorker } from "./EditWorker/EditWorker";
import { useEffect, useState } from "react";
import { useGetDirectorWorkersQuery } from "../../../store/billing/billing.api";
import { WorkerModal } from "../../Structure/WorkerModal";
import { useActions } from "../../../hooks/actions";
import { useAppSelect } from "../../../hooks/redux";

export const Workers = ({
  tarifSelected,
  selectedWorkers,
  onSelect,
  refetchWorkers,
  onRefetchedWorkers,
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const { data, refetch } = useGetDirectorWorkersQuery();
  const [workers, setWorkers] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
    billing: false,
    active: false,
    roles: [],
  });
  const { saveWorkersCount } = useActions();
  const { user } = useAppSelect((state) => state.auth);

  const handleChangeFilter = (fieldName, value) =>
    setFilter({ ...filter, [fieldName]: value });

  useEffect(() => {
    if (tarifSelected) {
      setEditOpen(false);
    }
  }, [tarifSelected]);

  useEffect(() => {
    if (refetchWorkers) {
      refetch();
      onRefetchedWorkers();
    }
  }, [refetchWorkers]);

  useEffect(() => {
    const workersResp = data
      ? Object.entries(data)
          ?.filter((w) => w[0] !== "error")
          ?.filter((w) => w[0] !== "messege")
          ?.map((w) => w[1])
      : [];

    setWorkers([{ ...user, isCurrentUser: true }, ...workersResp]);

    saveWorkersCount(workersResp?.length);
  }, [data, user]);

  const handleFilter = () =>
    workers
      ?.filter(({ first_name, last_name, phones }) =>
        filter?.search?.length > 0
          ? `${first_name ?? ""} ${last_name ?? ""}`
              .toLowerCase()
              .includes(filter?.search?.toLowerCase()) ||
            !!phones?.find((p) =>
              p.phone.includes(filter?.search?.toLowerCase())
            )
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
        count={handleFilter()?.length - 1}
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
          level={editOpen?.struct_level}
          onRefetchData={refetch}
          noStructure
          showPayHistory
          worker={!editOpen?.isAdmin}
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
