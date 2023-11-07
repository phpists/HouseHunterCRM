import { styled } from "styled-components";
import { Card } from "./Card";
import { Divider } from "../Divider";
import { ProfileField } from "../../../components/ProfileField";
import { handleFormatFields } from "../../../utilits";
import { useGetRubricsQuery } from "../../../store/requests/requests.api";

export const Characteristic = ({ data, onChangeField, fields }) => {
  const { data: rubricsList } = useGetRubricsQuery();

  const handleChangeValue = (rubricId, fieldName, value) => {
    onChangeField(
      "fields",
      data?.fields.map((f) =>
        f.id_rubric === rubricId ? { ...f, [fieldName]: value } : f
      )
    );
  };

  return (
    <StyledCharacteristic className="request-card hide-scroll">
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
