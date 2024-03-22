import styled from "styled-components";
import cogoToast from "cogo-toast";
import { useGetWorkerToMoveClientsQuery } from "../../../store/clients/clients.api";
import { useState } from "react";
import { handleResponse } from "../../../utilits";
import { Modal } from "../../../components/Modal/Modal";
import { Select } from "../../../components/Select/Select";
import { Button } from "../../../components/Button";
import { useLazyMoveCallQuery } from "../../../store/calls/calls.api";

export const SendCall = ({
  callId,
  onClose,
  onSendSuccess,
  onChangeLoading,
}) => {
  const { data } = useGetWorkerToMoveClientsQuery();
  const [selectedUser, setSelectedUser] = useState(null);
  const [moveCall] = useLazyMoveCallQuery();

  const handleSubmit = () => {
    onChangeLoading && onChangeLoading(true);
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
  };

  return (
    <StyledSendModal>
      <Modal open={!!callId} onClose={onClose} title="Передати дзвінок">
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
