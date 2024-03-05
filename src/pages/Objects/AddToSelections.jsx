import styled from "styled-components";
import { Select } from "../../components/Select/Select";
import { useLazyGetAllObjectsQuery } from "../../store/objects/objects.api";
import { useEffect, useState } from "react";
import {
  useGetFoldersListQuery,
  useLazyAddObjectToSelectionsQuery,
} from "../../store/selections/selections.api";
import { useParams } from "react-router-dom";
import { checkIsArray, handleResponse } from "../../utilits";
import cogoToast from "cogo-toast";
import { Modal } from "../../components/Modal/Modal";

export const AddToSelections = ({ onClose, idObject, onSuccess }) => {
  const { data } = useGetFoldersListQuery();
  const [addObjectToSelections] = useLazyAddObjectToSelectionsQuery();
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleAddObj = () => {
    addObjectToSelections({
      id_request_group: selectedRequest,
      id_objects: Array.isArray(idObject) ? idObject : [idObject],
    }).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success(
          `Об'єкт${checkIsArray(idObject)?.length > 0 && "и"} успішно добалено`,
          {
            hideAfter: 3,
            position: "top-right",
          }
        );
        onClose();
        onSuccess && onSuccess();
      })
    );
  };

  return (
    <StyledAddToSelections>
      <Modal
        // open={true}
        onClose={onClose}
        onSubmit={() => null}
        title="Додати об’єкт в підбірку"
      >
        <div className="select-label">Назва підбірки</div>
        <Select
          //   label="Назва підбірки"
          value={selectedRequest}
          onChange={(val) => setSelectedRequest(val)}
          options={
            data?.data?.map(({ id, name, clients_name }) => ({
              title: `${clients_name?.length === 0 ? "-" : clients_name} \n ${
                name?.length === 0 ? "-" : name
              }`,
              value: id,
            })) ?? []
          }
          placeholder="Оберіть підбірку"
          className="select-wrapper"
          isSearch
        />
        <button
          className="submit-btn"
          disabled={!selectedRequest}
          onClick={handleAddObj}
        >
          Додати
        </button>
      </Modal>
    </StyledAddToSelections>
  );
};

const StyledAddToSelections = styled.div`
  .submit-btn {
    margin-top: 15px;
    border-radius: 8px;
    background: rgba(93, 99, 255, 0.7);
    display: flex;
    height: 38px;
    padding: 9px 18px 11px 18px;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-align: center;
    leading-trim: both;
    text-edge: cap;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    width: 100%;
    transition: all 0.3s;
    &:hover {
      background: #5d63ff;
    }
  }
  .select-wrapper {
    padding: 10px;
    border-radius: 6px;
    background: #474747;
    .label {
      display: none;
    }
  }
  .select-label {
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 100;
    line-height: 120%; /* 16.8px */
    margin-bottom: 4px;
    text-align: left;
  }
`;
