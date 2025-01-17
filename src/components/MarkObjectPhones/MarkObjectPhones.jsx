import styled from "styled-components";
import { Modal } from "../Modal/Modal";
import { useEffect, useState } from "react";
import { CheckOption } from "../CheckOption";
import { Field } from "../Field";
import { Select } from "../Select/Select";
import { ProfileField } from "../ProfileField";
import {
  useGetAgenciesQuery,
  useLazyAddOherAgencyQuery,
  useLazyAddPicaroonQuery,
  useLazyCleanObjectMarksQuery,
  useLazyGetPhoneObjectQuery,
} from "../../store/objects/objects.api";
import { Button } from "../Button";
import { handleResponse, showAlert } from "../../utilits";

export const MarkObjectPhones = ({ onClose, object, onSuccess }) => {
  const { data: agencies } = useGetAgenciesQuery();
  const [type, setType] = useState(0);
  const [name, setName] = useState("");
  const [agency, setAgency] = useState("");
  const [addPicatoon] = useLazyAddPicaroonQuery();
  const [addOtherAgency] = useLazyAddOherAgencyQuery();
  const [cleanObjectMarks] = useLazyCleanObjectMarksQuery();
  const [getClient] = useLazyGetPhoneObjectQuery();

  const handleChangeType = (t) => {
    if (t !== type) {
      setType(t);
      setName("");
      setAgency("");
    }
  };

  const handleSave = () => {
    if (type === 0) {
      cleanObjectMarks(object?.id).then((resp) => {
        handleResponse(resp, () => {
          showAlert("success", "Успішно збережено");

          getClient(object?.id).then((resp) => {
            onSuccess && onSuccess(object?.id, resp?.data);
            onClose();
          });
        });
      });
    } else if (type === 2) {
      addPicatoon(object?.id).then((resp) => {
        handleResponse(resp, () => {
          showAlert("success", "Успішно збережено");
          onSuccess &&
            onSuccess(object?.id, {
              type: "ШАХРАЙ",
              contact: {
                name: "ШАХРАЙ",
              },
              error: 0,
            });
        });
        onClose();
      });
    } else if (type === 1) {
      const clientName = object?.clients_inf?.contact?.name ?? "Name";
      addOtherAgency({
        id_object: object?.id,
        agency_name: agency?.length > 0 ? agency : "Стороння агенція",
        rieltor_name: name?.length > 0 ? name : clientName,
      }).then((resp) => {
        handleResponse(resp, () => {
          showAlert("success", "Успішно збережено");
          onSuccess &&
            onSuccess(object?.id, {
              type: "Стороння агенція",
              contact: {
                name: name?.length > 0 ? name : clientName,
                party_agency: agency?.length > 0 ? agency : "Стороння агенція",
              },
              error: 0,
            });
        });
        onClose();
      });
    }
  };

  useEffect(() => {
    const isAgency = object?.clients_inf?.contact?.party_agency;
    const type = object?.clients_inf?.type;
    if (isAgency) {
      setType(1);
      setName(object?.clients_inf?.contact?.name);
      setAgency(isAgency);
    } else if (type === "ШАХРАЙ") {
      setType(2);
    }
  }, [object]);

  return (
    <StyledMarkObjectPhones>
      <Modal onClose={onClose} title="Мітка номерів автомобілю">
        <div className="markPhonesContent">
          <CheckOption
            label="Не визначено"
            value={type === 0 ? "1" : "0"}
            onChange={() => handleChangeType(0)}
          />
          <CheckOption
            label="Стороння агенція"
            value={type === 1 ? "1" : "0"}
            onChange={() => handleChangeType(1)}
          />
          {type === 1 ? (
            <>
              <ProfileField
                label="Ім'я агента"
                value={name}
                onChange={(val) => setName(val)}
                placeholder="Введіть значення"
              />
              <Select
                label="Назва агенції"
                value={agency}
                onChange={(val) => setAgency(val)}
                options={
                  agencies?.data
                    ? agencies?.data?.map(({ agency_name }) => ({
                        title: agency_name,
                        value: agency_name,
                      }))
                    : []
                }
                editValue
                isSearch
              />
            </>
          ) : null}
          <CheckOption
            label="Шахрай"
            value={type === 2 ? "1" : "0"}
            onChange={() => handleChangeType(2)}
          />
          <Button onClick={handleSave} title="Зберегти" />
        </div>
      </Modal>
    </StyledMarkObjectPhones>
  );
};

const StyledMarkObjectPhones = styled.div`
  .markPhonesContent {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    gap: 5px;
  }
`;
