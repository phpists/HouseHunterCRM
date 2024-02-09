import { Ranger } from "../../../components/Ranger/Ranger";
import { Divider } from "../Divider";
import { SelectTags } from "../../../components/SelectTags/SelectTags";
import {
  handleChangeRange,
  handleFormatFields,
  handleGetFieldsOptions,
} from "../../../utilits";
import { ProfileField } from "../../../components/ProfileField";
import { TitleDivider } from "./TitleDivider";
import styled from "styled-components";
import { useGetCommentsToFieldsQuery } from "../../../store/objects/objects.api";
import { CheckOption } from "../../../components/CheckOption";

export const Card = ({ title, fields, data, onChangeField, errors }) => {
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();

  const filteredFields = [
    "id_rubric",
    "id_location",
    "comment",
    "price_currency",
    "price_min_USD",
    "price_max_USD",
    "price_min_EUR",
    "price_max_EUR",
    "price_min_UAH",
    "price_max_UAH",
    "price_min",
    "price_max",
  ];

  return (
    <StyledCard>
      <TitleDivider title={title} />

      {fields
        ?.filter((f) => !filteredFields?.find((ff) => ff === f?.field))
        ?.map(({ field, field_option }, i) => {
          if (Object.entries(field_option)?.length > 0) {
            return (
              <>
                <Divider />
                <SelectTags
                  label={
                    commentsToFields?.object[field]
                      ? commentsToFields?.object[field]
                      : commentsToFields?.request[field] ?? ""
                  }
                  placeholder="Оберіть"
                  notMultiSelect
                  options={handleGetFieldsOptions(fields, field)}
                  value={data[field]}
                  onChange={(val) => onChangeField(field, val)}
                  error={!!errors?.find((e) => e === field)}
                />
              </>
            );
          } else if (
            field?.includes("_min") &&
            fields?.find((f) => f.field === field?.replace("_min", "_max"))
          ) {
            const labels = {
              room_min: "Кількість кімнат/Приміщень",
              storey_count_min: "Поверховість",
              area_total_min: "Площа",
              area_plot_sotka_min: "Площа ділянки",
              address_storey_min: "Поверх від/до",
            };
            const maxFieldName = field?.replace("_min", "_max");

            return (
              <>
                <Divider />
                <Ranger
                  label={labels[field] ?? ""}
                  max={100}
                  values={[data[field] ?? 0, data[maxFieldName] ?? 0]}
                  onChange={(values) =>
                    handleChangeRange(
                      values,
                      [data[field] ?? 0, data[maxFieldName] ?? 0],
                      [field, maxFieldName],
                      onChangeField
                    )
                  }
                  error={
                    !!errors?.find((e) => e === field) ||
                    !!errors?.find((e) => e === maxFieldName)
                  }
                />
              </>
            );
          } else if (field?.type === "checkbox") {
            return (
              <CheckOption
                label={
                  commentsToFields?.object[field]
                    ? commentsToFields?.object[field]
                    : commentsToFields?.request[field] ?? ""
                }
                value={data[field]}
                onChange={(val) => onChangeField(field, val)}
              />
            );
          } else if (
            field?.includes("_max") &&
            !fields?.find((f) => f.field === field?.replace("_max", "_min"))
          ) {
            return <div></div>;
          }
        })}
    </StyledCard>
  );
};

const StyledCard = styled.div`
  margin-bottom: 20px;
`;
