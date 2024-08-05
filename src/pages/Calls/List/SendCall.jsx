import styled from "styled-components";
import cogoToast from "cogo-toast";
import {
  useGetWorkerToMoveClientsQuery,
  useLazyMoveClientsQuery,
} from "../../../store/clients/clients.api";
import { useState } from "react";
import { handleResponse } from "../../../utilits";
import { Modal } from "../../../components/Modal/Modal";
import { Select } from "../../../components/Select/Select";
import { Button } from "../../../components/Button";
import {
  useLazyMoveCallQuery,
  useLazySendOrderTelegrambotQuery,
} from "../../../store/calls/calls.api";

export const SendCall = ({
  callId,
  onClose,
  onSendSuccess,
  onChangeLoading,
  calls,
  clients,
  massiveAction,
  telegram,
}) => {
  const { data } = useGetWorkerToMoveClientsQuery();
  const [selectedUser, setSelectedUser] = useState(null);
  const [moveCall] = useLazyMoveCallQuery();
  const [sendTelegramCall] = useLazySendOrderTelegrambotQuery();
  const [moveClients] = useLazyMoveClientsQuery();

  const handleSendCliens = async () => {
    if (clients?.length > 0) {
      onChangeLoading && onChangeLoading(true);
      await moveClients({
        id_clients: clients,
        id_user_to: selectedUser,
      });
      return true;
    } else {
      return true;
    }
  };

  const handleSendCalls = async () => {
    await Promise.all(
      calls.map((c) =>
        moveCall({
          id_call: c,
          id_user_to: selectedUser,
        })
      )
    );
  };

  const handleSubmit = async () => {
    if (massiveAction) {
      await handleSendCliens();
      await handleSendCalls();
      cogoToast.success("Успішно передано", {
        hideAfter: 3,
        position: "top-right",
      });
      onChangeLoading && onChangeLoading(false);
      onClose();
      onSendSuccess && onSendSuccess();
    } else {
      onChangeLoading && onChangeLoading(true);
      if (telegram) {
        sendTelegramCall({
          id_user_hash: selectedUser,
          id_order: callId,
        }).then((resp) =>
          handleResponse(
            resp,
            () => {
              cogoToast.success("Успішно передано", {
                hideAfter: 3,
                position: "top-right",
              });
              onChangeLoading && onChangeLoading(false);
              onClose();
              onSendSuccess && onSendSuccess();
            },
            () => {
              onChangeLoading && onChangeLoading(false);
            }
          )
        );
      } else {
        moveCall({
          id_call: callId,
          id_user_to: selectedUser,
        }).then((resp) =>
          handleResponse(
            resp,
            () => {
              cogoToast.success("Успішно передано", {
                hideAfter: 3,
                position: "top-right",
              });
              onChangeLoading && onChangeLoading(false);
              onClose();
              onSendSuccess && onSendSuccess();
            },
            () => {
              onChangeLoading && onChangeLoading(false);
            }
          )
        );
      }
    }
  };

  return (
    <StyledSendModal>
      <Modal open={!!callId} onClose={onClose} title="Передати">
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
