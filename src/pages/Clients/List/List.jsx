import { styled } from "styled-components";
import { Card } from "./Card/Card";
import { Empty } from "../../../components/Empty/Empty";
import { useState } from "react";
import { Confirm } from "../../../components/Confirm/Confirm";
import { useGetAccessQuery } from "../../../store/auth/auth.api";
import { handleCheckAccess } from "../../../utilits";

export const List = ({ selected, onSelect, clients, innerRef, onDelete }) => {
  const [deleteModal, setDeleteModal] = useState(null);
  const { data: accessData } = useGetAccessQuery();

  const handleOpenDeleteModal = (id) => setDeleteModal(id);

  const handleDelete = () => {
    onDelete(deleteModal);
    setDeleteModal(null);
  };
  return (
    <>
      {deleteModal && (
        <Confirm
          title="Видалити клієнта?"
          onSubmit={handleDelete}
          onClose={() => setDeleteModal(null)}
        />
      )}
      <StyledList className="hide-scroll" ref={innerRef}>
        {clients?.length === 0 ? (
          <Empty />
        ) : (
          clients?.map(
            (
              {
                full_name,
                id,
                dt_add,
                phones,
                all_req,
                all_obj,
                comment,
                first_name,
                last_name,
              },
              i
            ) => (
              <Card
                key={i}
                selected={!!selected.find((s) => s === id)}
                onSelect={() => onSelect(id)}
                name={`${first_name} ${last_name}`}
                id={id}
                dateCreate={dt_add}
                phones={phones}
                requestsCount={all_req}
                objectsCount={all_obj}
                comment={comment}
                onDelete={() => handleOpenDeleteModal(id)}
                isDelete={handleCheckAccess(accessData, "clients", "delete")}
              />
            )
          )
        )}
      </StyledList>
    </>
  );
};

const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  overflow: auto;
  height: calc(100svh - 232px);
  grid-auto-rows: max-content;
  @media (max-width: 1400px) {
    height: calc(100svh - 302px + 68px);
  }
`;
