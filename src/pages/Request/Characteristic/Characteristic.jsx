import { styled } from "styled-components";
import { Card } from "./Card";
import { Divider } from "../Divider";
import { ProfileField } from "../../../components/ProfileField";
import { handleFormatFields } from "../../../utilits";
import { useGetRubricsQuery } from "../../../store/requests/requests.api";
import { useEffect, useRef } from "react";

export const Characteristic = ({
  data,
  onChangeField,
  fields,
  errors,
  onChangeErrors,
}) => {
  const { data: rubricsList } = useGetRubricsQuery();
  const contentRef = useRef(null);

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

  const handleChangeValue = (rubricId, fieldName, value) => {
    onChangeField(
      "fields",
      data?.fields.map((f) =>
        f.id_rubric === rubricId ? { ...f, [fieldName]: value } : f
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

  return (
    <StyledCharacteristic
      className="request-card hide-scroll request-characteristic-wrapper"
      ref={contentRef}
    >
      <ProfileField
        label="Дата дедлайну"
        placeholder="Введіть дату дедлайну"
        value={data?.general_group?.dt_deadline}
        onChange={(val) =>
          onChangeField("general_group", {
            ...data.general_group,
            dt_deadline: val,
          })
        }
        type="date"
      />
      {fields.map((field, i) => (
        <Card
          key={i}
          fields={field.fields}
          title={rubricsList?.find((r) => r.id === field?.id)?.name}
          data={data?.fields.find((f) => f.id_rubric === field.id)}
          onChangeField={(fieldName, value) =>
            handleChangeValue(field.id, fieldName, value)
          }
          errors={errors.find((e) => e.id_rubric === field?.id)?.errors ?? []}
        />
      ))}
    </StyledCharacteristic>
  );
};

const StyledCharacteristic = styled.div`
  padding: 8px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  .toggle-opt {
    margin-top: 6.5px;
  }
  .opt-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 7px;
  }
`;
