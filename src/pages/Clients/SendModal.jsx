import styled from "styled-components";
import { Modal } from "../../components/Modal/Modal";
import {
  useGetWorkerToMoveClientsQuery,
  useLazyMoveClientsQuery,
} from "../../store/clients/clients.api";
import { Select } from "../../components/Select/Select";
import { useState } from "react";
import { Button } from "../../components/Button";
import { handleResponse } from "../../utilits";
import cogoToast from "cogo-toast";

export const SendModal = ({
  clients,
  onClose,
  onSendSuccess,
  onChangeLoading,
}) => {
  const { data } = useGetWorkerToMoveClientsQuery();
  const [moveClients] = useLazyMoveClientsQuery();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSubmit = () => {
    onChangeLoading && onChangeLoading(true);
    moveClients({
      id_clients: clients,
      id_user_to: selectedUser,
    }).then((resp) =>
      handleResponse(
        resp,
        () => {
          onSendSuccess();
          cogoToast.success("Успішно передано", {
            hideAfter: 3,
            position: "top-right",
          });
          onChangeLoading && onChangeLoading(false);
        },
        () => {
          onChangeLoading && onChangeLoading(false);
        }
      )
    );
  };

  return (
    <StyledSendModal>
      <Modal open={!!clients} onClose={onClose} title="Передати">
        <div>
          <Select
            label="Працівник"
            placeholder="Оберіть працівника"
            options={
              data?.users
                ? data?.users?.map(({ id_user, full_name }) => ({
                    title: full_name,
                    value: id_user,
                  }))
                : []
            }
            value={selectedUser}
            onChange={(val) => setSelectedUser(val)}
            isSearch
          />
          <Button
            title="Передати"
            className="submit-btn"
            disabled={!selectedUser}
            onClick={handleSubmit}
          />
        </div>
      </Modal>
    </StyledSendModal>
  );
};

const StyledSendModal = styled.div`
  .submit-btn {
    width: 100%;
    margin-top: 20px;
  }
`;
