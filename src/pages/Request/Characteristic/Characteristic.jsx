import { styled } from "styled-components";
import { Card } from "./Card";
import { useGetRubricsQuery } from "../../../store/requests/requests.api";
import { useEffect, useRef, useState } from "react";
import { Deadline } from "./Deadline";

export const Characteristic = ({
  data,
  onChangeField,
  fields,
  errors,
  onChangeErrors,
}) => {
  const { data: rubricsList } = useGetRubricsQuery();
  const contentRef = useRef(null);
  const [selectOpened, setSelectOpend] = useState(false);

  useEffect(() => {
    if (!!errors?.find((e) => e.id === "updated")) {
      const firstErrorField = document.querySelectorAll(
        ".request-characteristic-wrapper .error-field"
      );
      if (firstErrorField[0]) {
        contentRef.current.scrollTo({
          top: firstErrorField[0].offsetTop - contentRef.current.offsetTop - 10,
        });
      }
    }
  }, [errors]);

  useEffect(() => {
    if (selectOpened) {
      setSelectOpend(false);
      const firstErrorField = document.querySelectorAll(
        ".request-characteristic-wrapper .selectOpened"
      );
      if (firstErrorField[0]) {
        contentRef.current.scrollTo({
          top: firstErrorField[0].offsetTop - contentRef.current.offsetTop - 10,
        });
      }
    }
  }, [selectOpened]);

  const handleChangeValue = (rubricId, fieldName, value, isUpdate) => {
    onChangeField(
      "fields",
      data?.fields.map((f) =>
        f.id_rubric === rubricId
          ? isUpdate
            ? value
            : { ...f, [fieldName]: value }
          : f
      )
    );
    onChangeErrors(
      errors
        .map((e) =>
          e.id_rubric === rubricId
            ? { ...e, errors: e.errors.filter((f) => f !== fieldName) }
            : e
        )
        .filter((e) => e.id !== "updated")
    );
  };

  const handleChangeDeadline = (val) => {
    onChangeField(
      "general_group",
      {
        ...data.general_group,
        dt_deadline: val,
      },
      "dt_deadline"
    );
    onChangeErrors(
      errors
        .map((e) =>
          e.id === "general"
            ? { ...e, errors: e.errors.filter((f) => f !== "dt_deadline") }
            : e
        )
        .filter((e) => e.id !== "updated")
    );
  };

  const handleOpenSelect = (val) => setSelectOpend(val);

  return (
    <StyledCharacteristic
      className="request-card  request-characteristic-wrapper"
      ref={contentRef}
    >
      <Deadline
        value={data?.general_group?.dt_deadline}
        onChange={handleChangeDeadline}
        error={
          !!errors
            .find((e) => e.id === "general")
            ?.errors?.find((e) => e === "dt_deadline")
        }
      />
      {fields.map((field, i) => (
        <Card
          key={i}
          fields={field.fields}
          title={rubricsList?.find((r) => r.id === field?.id)?.name}
          data={data?.fields.find((f) => f.id_rubric === field.id)}
          onChangeField={(fieldName, value, isUpdate) =>
            handleChangeValue(field.id, fieldName, value, isUpdate)
          }
          errors={errors.find((e) => e.id_rubric === field?.id)?.errors ?? []}
          onSelectOpen={handleOpenSelect}
        />
      ))}
    </StyledCharacteristic>
  );
};

const StyledCharacteristic = styled.div`
  padding: 8px;
  border-radius: 14px;
  background: var(--bg-10);
  .toggle-opt {
    margin-top: 6.5px;
  }
  .opt-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 7px;
  }
`;
