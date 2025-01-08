import { Ranger } from "../../../components/Ranger/Ranger";
import { Divider } from "../Divider";
import { SelectTags } from "../../../components/SelectTags/SelectTags";
import { handleChangeRange, handleGetFieldsOptions } from "../../../utilits";
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
    "price_for",
  ];

  return (
    <StyledCard>
      <TitleDivider title={title} />
      {fields
        ?.filter((f) => !filteredFields?.find((ff) => ff === f?.field))
        ?.map(({ field, field_option, type }, i) => {
          if (Object.entries(field_option)?.length > 0) {
            return (
              <>
                {i > 0 && <Divider />}
                <SelectTags
                  label={
                    commentsToFields?.request?.[field]
                      ? commentsToFields?.request?.[field]
                      : commentsToFields?.object?.[field] ?? ""
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
              area_total_min: commentsToFields?.object?.area_total ?? "Площа",
              area_plot_sotka_min:
                commentsToFields?.object?.area_plot_sotka ?? "Площа ділянки",
              address_storey_min: "Поверх від/до",
            };
            const minFieldName = ["address_storey", "storey_count"]?.includes(
              field
            )
              ? `${field}_min`
              : field;
            const maxFieldName = ["address_storey", "storey_count"]?.includes(
              field
            )
              ? `${field}_max`
              : field?.replace("_min", "_max");

            return (
              <>
                {i > 0 && <Divider />}
                <Ranger
                  label={labels[minFieldName] ?? ""}
                  max={100}
                  values={[data[minFieldName] ?? 0, data[maxFieldName] ?? 0]}
                  onChange={(values) =>
                    handleChangeRange(
                      values,
                      [data[minFieldName] ?? 0, data[maxFieldName] ?? 0],
                      [minFieldName, maxFieldName],
                      onChangeField
                    )
                  }
                  error={
                    !!errors?.find((e) => e === minFieldName) ||
                    !!errors?.find((e) => e === maxFieldName)
                  }
                />
              </>
            );
          } else if (["not_first_storey", "not_last_storey"]?.includes(field)) {
            const labels = {
              not_first_storey: "Не перший поверх",
              not_last_storey: "Не останній поверх",
            };
            return (
              <>
                {" "}
                {i > 0 && <Divider />}
                <CheckOption
                  label={labels[field] ?? ""}
                  value={data[field]}
                  onChange={(val) => onChangeField(field, val)}
                />
              </>
            );
          } else if (
            field?.includes("_max") &&
            !fields?.find((f) => f.field === field?.replace("_max", "_min"))
          ) {
            return <div></div>;
          } else {
            return null;
          }
        })}
    </StyledCard>
  );
};

const StyledCard = styled.div`
  margin-bottom: 20px;
`;
