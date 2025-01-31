import styled from "styled-components";
import { Modal } from "../../components/Modal/Modal";
import {
  useGetWorkerToMoveClientsQuery,
  useLazyMoveClientsQuery,
} from "../../store/clients/clients.api";
import { Select } from "../../components/Select/Select";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import {
  handleGetLocationAllPath,
  handleResponse,
  showAlert,
} from "../../utilits";
import {
  useLazyAddLocationQuery,
  useLazyEditLocationQuery,
} from "../../store/auth/auth.api";
import { Field } from "../../components/Field";
import { ProfileField } from "../../components/ProfileField";
import { SelectTags } from "../../components/SelectTags/SelectTags";
import { TagsFilter } from "../../components/TagsFilter/TagsFilter";

export const LocationModal = ({ locations, onClose, onSuccess, editData }) => {
  const [addLocation] = useLazyAddLocationQuery();
  const [editLocation] = useLazyEditLocationQuery();
  const [name, setName] = useState("");
  const [idParent, setIdParent] = useState("0");
  const [keys, setKeys] = useState([]);
  const [errors, setErrros] = useState([]);
  const [formatedLocations, setFormatedLocations] = useState([]);

  const handleValidate = () => {
    let errs = [];
    if (name?.length === 0) {
      errs.push("name");
    }
    if (keys?.length === 0) {
      errs.push("keys");
    }

    setErrros(errs);
    return errs.length === 0;
  };

  const handleSubmit = () => {
    if (handleValidate()) {
      const sendData = {
        id_parent: idParent,
        name,
        search_key_json: keys,
      };
      editData
        ? editLocation({
            id: editData?.id,
            ...sendData,
          }).then((resp) => {
            handleResponse(resp, () => {
              onSuccess(sendData, editData?.id);
              showAlert("success", "Зміни успішно збережено");
            });
          })
        : addLocation(sendData).then((resp) => {
            handleResponse(resp, () => {
              onSuccess(sendData);
              showAlert("success", "Зміни успішно збережено");
            });
          });
      onClose();
    } else {
      showAlert("error", "Заповніть обов'язкові поля");
    }
  };

  const handleFormatLocations = () => {
    const locList = Object.entries(locations)?.map((loc) => loc[1]);
    const locationsList = Object.entries(locations)
      .sort((a, b) => Number(b[1].id_parent) - Number(a[1].id_parent))
      ?.map((loc) => loc[1])
      //   .filter((loc) => Number(loc?.id_parent) !== 0)
      .map(({ id, id_parent, name }) => {
        return handleGetLocationAllPath(locList, id, id_parent, name);
      });

    setFormatedLocations(locationsList);
  };

  useEffect(() => {
    if (locations) {
      handleFormatLocations();
    }
  }, [locations]);

  const handleGetKeys = () => {
    try {
      return JSON.parse(editData?.search_key_json);
    } catch {
      return [];
    }
  };

  useEffect(() => {
    if (editData) {
      setIdParent(editData?.id_parent ?? "0");
      setName(editData?.name ?? "");
      setKeys(handleGetKeys());
    }
  }, [editData]);

  return (
    <StyledLocationModal>
      <Modal
        onClose={onClose}
        title={editData ? "Редагування локації" : "Створення локації"}
      >
        <div className="location-modal-content">
          <Select
            label="батьківська локація"
            placeholder="Оберіть батьківську локацію"
            options={
              formatedLocations
                ? [
                    { title: "Україна", value: "0" },
                    ...formatedLocations?.sort(
                      (a, b) => a.title?.length - b.title?.length
                    ),
                  ]
                : []
            }
            value={idParent}
            onChange={(val) => setIdParent(val)}
            isSearch
            className="input-wrapper"
          />
          <ProfileField
            label="Назва"
            placeholder=""
            value={name}
            onChange={(val) => {
              setName(val);
              setErrros(errors?.filter((e) => e !== "name"));
            }}
            alwaysOpen
            initOpen
            className="input-wrapper"
            error={!!errors.includes("name")}
          />
          <TagsFilter
            placeholder="Почніть писати"
            label={`Відмінки`}
            tags={keys}
            onChange={(val) => {
              setKeys(val);
              setErrros(errors?.filter((e) => e !== "keys"));
            }}
            minLength={4}
            error={!!errors.includes("keys")}
            className="input-wrapper"
            showAll
          />
          <Button
            title={editData ? "Зберегти" : "Створити"}
            className="submit-btn"
            onClick={handleSubmit}
          />
        </div>
      </Modal>
    </StyledLocationModal>
  );
};

const StyledLocationModal = styled.div`
  .submit-btn {
    width: 100%;
    margin-top: 20px;
  }
  .modal {
    overflow: visible !important;
    max-width: 500px;
  }
  .location-modal-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .input-wrapper {
    background: var(--card-bg-2) !important ;
    border-radius: 6px;
    .label {
      color: var(--main-color);
      opacity: 0.4;
    }
    input {
      color: var(--main-color);
      &::placeholder {
        color: var(--main-color);
      }
    }
  }
`;
