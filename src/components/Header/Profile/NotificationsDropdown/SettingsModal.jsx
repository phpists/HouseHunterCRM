import styled from "styled-components";
import { Modal } from "../../../Modal/Modal";
import { useEffect, useState } from "react";
import { ToggleOption } from "../../../ToggleOption";
import {
  useGetNofiticationMobileAppQuery,
  useLazyChangeNotificationMobileAppQuery,
} from "../../../../store/auth/auth.api";
import { Button } from "../../../Button";
import {
  handleChangeRange,
  handleResponse,
  showAlert,
} from "../../../../utilits";
import { Ranger } from "../../../Ranger/Ranger";
import { Field } from "../../../Field";
import { ProfileField } from "../../../ProfileField";

export const SettingsModal = ({ onClose }) => {
  const { data: resp } = useGetNofiticationMobileAppQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [changeNotificationMobile] = useLazyChangeNotificationMobileAppQuery();
  const [data, setData] = useState({
    filter_1: false,
    filter_2: false,
    filter_3: false,
    filter_4: false,
    filter_5: false,
    filter_6: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleChangeField = (field, value) => {
    setData({ ...data, [field]: value });
  };

  useEffect(() => {
    setData(resp?.filters?.filters ?? {});
  }, [resp]);

  const handleValidation = () => {
    const errs = [];

    if (data.filter_1 === "1") {
      if (
        !data.filter_1_from ||
        Number(data.filter_1_from) === 0 ||
        !data.filter_1_to ||
        Number(data.filter_1_to) === 0
      ) {
        errs.push("filter_1_price");
      }
    }

    if (data.filter_2 === "1") {
      if (data.filter_2_index_from?.length === 0) {
        errs.push("filter_2_index_from");
      }
      if (
        !data.filter_2_price_from ||
        Number(data.filter_2_price_from) === 0 ||
        !data.filter_2_price_to ||
        Number(data.filter_2_price_to) === 0
      ) {
        errs.push("filter_2_price");
      }
    }

    if (data.filter_3 === "1") {
      if (data.filter_3_index_from?.length === 0) {
        errs.push("filter_3_index_from");
      }
      if (data.filter_3_procent_from?.length === 0) {
        errs.push("filter_3_procent_from");
      }
      if (
        !data.filter_3_price_from ||
        Number(data.filter_3_price_from) === 0 ||
        !data.filter_3_price_to ||
        Number(data.filter_3_price_to) === 0
      ) {
        errs.push("filter_3_price");
      }
    }

    setErrors(errs);
    if (errs.length > 0) {
      showAlert("error", "Заповніть обов'язкові поля");
    }
    return errs.length === 0;
  };

  const handleSave = () => {
    if (handleValidation()) {
      setLoading(true);
      changeNotificationMobile(data).then((resp) => {
        setLoading(true);
        handleResponse(resp, () => {
          showAlert("success", "Успішно збережено");
          onClose();
        });
      });
    }
  };

  return (
    <StyledSettingsModal>
      <Modal
        title="Отримуйте сповіщення (на сайті / в Телеграм)?"
        onClose={onClose}
      >
        <div className="fields">
          <ToggleOption
            label="Про нові автомобілі"
            value={data.filter_1 === "1"}
            onChange={() =>
              handleChangeField("filter_1", data.filter_1 === "1" ? "0" : "1")
            }
          />
          {data.filter_1 === "1" ? (
            <>
              <Ranger
                label="Ціна автомобіля"
                className="mb-2"
                max={1000}
                values={[data?.filter_1_from ?? 0, data?.filter_1_to ?? 0]}
                onChange={(values) =>
                  handleChangeRange(
                    values,
                    [data?.filter_1_from ?? 0, data?.filter_1_to ?? 0],
                    ["filter_1_from", "filter_1_to"],
                    (values) =>
                      setData({
                        ...data,
                        ...values,
                      }),
                    true
                  )
                }
                error={!!errors?.includes("filter_1_price")}
              />
            </>
          ) : null}
          <ToggleOption
            label="Про присвоєння індексу зацікавленості (перший раз)"
            value={data.filter_2 === "1"}
            onChange={() =>
              handleChangeField("filter_2", data.filter_2 === "1" ? "0" : "1")
            }
          />
          {data.filter_2 === "1" ? (
            <>
              <ProfileField
                label="Індекс зацікавленості від"
                value={data.filter_2_index_from}
                onChange={(val) =>
                  handleChangeField("filter_2_index_from", val)
                }
                alwaysOpen
                initOpen
                error={errors?.includes("filter_2_index_from")}
              />

              <Ranger
                label="Ціна автомобіля"
                className="mb-2"
                max={1000}
                values={[
                  data?.filter_2_price_from ?? 0,
                  data?.filter_2_price_from ?? 0,
                ]}
                onChange={(values) =>
                  handleChangeRange(
                    values,
                    [
                      data?.filter_2_price_from ?? 0,
                      data?.filter_2_price_to ?? 0,
                    ],
                    ["filter_2_price_from", "filter_2_price_to"],
                    (values) =>
                      setData({
                        ...data,
                        ...values,
                      }),
                    true
                  )
                }
                error={errors?.includes("filter_2_price")}
              />
            </>
          ) : null}
          <ToggleOption
            label="Ціна впала за останій крок"
            value={data.filter_3 === "1"}
            onChange={() =>
              handleChangeField("filter_3", data.filter_3 === "1" ? "0" : "1")
            }
          />
          {data.filter_3 === "1" ? (
            <>
              <ProfileField
                label="Мінімум на х %"
                value={data.filter_3_procent_from}
                onChange={(val) =>
                  handleChangeField("filter_3_procent_from", val)
                }
                alwaysOpen
                initOpen
                error={errors?.includes("filter_3_procent_from")}
              />
              <Ranger
                label="Ціна автомобіля"
                className="mb-2"
                max={1000}
                values={[
                  data?.filter_3_price_from ?? 0,
                  data?.filter_3_price_to ?? 0,
                ]}
                onChange={(values) =>
                  handleChangeRange(
                    values,
                    [
                      data?.filter_3_price_from ?? 0,
                      data?.filter_3_price_to ?? 0,
                    ],
                    ["filter_3_price_from", "filter_3_price_to"],
                    (values) =>
                      setData({
                        ...data,
                        ...values,
                      }),
                    true
                  )
                }
                error={errors?.includes("filter_3_price")}
              />
              <ProfileField
                label="Індекс зацікавленості від"
                value={data.filter_3_index_from}
                onChange={(val) =>
                  handleChangeField("filter_3_index_from", val)
                }
                alwaysOpen
                initOpen
                error={errors?.includes("filter_3_index_from")}
              />
            </>
          ) : null}
          <ToggleOption
            label="Ціна впала вниз на будь-які авто в моїх обраних"
            value={data.filter_4 === "1"}
            onChange={() =>
              handleChangeField("filter_4", data.filter_4 === "1" ? "0" : "1")
            }
          />
          <ToggleOption
            label="Отримали новий коментар в Чат Авторіа"
            value={data.filter_5 === "1"}
            onChange={() =>
              handleChangeField("filter_5", data.filter_5 === "1" ? "0" : "1")
            }
          />{" "}
          <ToggleOption
            label="Ціна посипалась"
            value={data.filter_6 === "1"}
            onChange={() =>
              handleChangeField("filter_6", data.filter_6 === "1" ? "0" : "1")
            }
          />{" "}
          <Button
            title="Зберегти"
            onClick={handleSave}
            disabled={loading}
            loading={loading}
            className="mt-2"
          />
        </div>
      </Modal>
    </StyledSettingsModal>
  );
};

const StyledSettingsModal = styled.div`
  .modal {
    max-width: 600px;
  }
  .fields {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
