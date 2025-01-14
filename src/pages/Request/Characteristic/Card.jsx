import { Ranger } from "../../../components/Ranger/Ranger";
import { Divider } from "../Divider";
import { SelectTags } from "../../../components/SelectTags/SelectTags";
import { handleChangeRange, handleGetFieldsOptions } from "../../../utilits";
import { TitleDivider } from "./TitleDivider";
import styled from "styled-components";
import {
  useGetCommentsToFieldsQuery,
  useLazyGetBrandsQuery,
  useLazyGetModelsQuery,
} from "../../../store/objects/objects.api";
import { CheckOption } from "../../../components/CheckOption";
import { ProfileField } from "../../../components/ProfileField";
import { useEffect } from "react";

export const Card = ({ title, fields, data, onChangeField, errors }) => {
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const [getBrands, { data: brandsList }] = useLazyGetBrandsQuery();
  const [getModels, { data: modelsList }] = useLazyGetModelsQuery();

  useEffect(() => {
    getBrands(data.id_rubric);
  }, [data.id_rubric]);

  useEffect(() => {
    getModels({
      id_category: data.id_rubric,
      id_brand: data.id_brand,
    });
  }, [data.id_brand]);

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

  console.log(
    fields?.filter((f) => !filteredFields?.find((ff) => ff === f?.field))
  );

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
          } else if (["id_brand", "id_model"].includes(field)) {
            return (
              <div>
                {i > 0 && <Divider />}
                <SelectTags
                  value={data?.[field]}
                  placeholder="Оберіть"
                  notMultiSelect
                  options={
                    field === "id_brand"
                      ? brandsList?.data
                        ? brandsList?.data?.map(({ name, id_brand }) => ({
                            title: name,
                            value: id_brand,
                          }))
                        : []
                      : modelsList?.data
                      ? modelsList?.data?.map(({ name, id_model }) => ({
                          title: name,
                          value: id_model,
                        }))
                      : []
                  }
                  onChange={(val) => onChangeField(field, val)}
                  label={
                    commentsToFields?.request?.[field]
                      ? commentsToFields?.request?.[field]
                      : commentsToFields?.object?.[field] ?? ""
                  }
                  hideArrowDefault
                  search
                />
              </div>
            );
          } else if (
            field?.includes("_max") &&
            !fields?.find((f) => f.field === field?.replace("_max", "_min"))
          ) {
            return <div></div>;
          } else if (type === "int") {
            return (
              <div>
                {" "}
                {i > 0 && <Divider />}
                <ProfileField
                  label={
                    commentsToFields?.request?.[field]
                      ? commentsToFields?.request?.[field]
                      : commentsToFields?.object?.[field] ?? ""
                  }
                  value={data[field]}
                  onChange={(val) => onChangeField(field, val)}
                  placeholder="Введіть значення"
                  type="number"
                />{" "}
              </div>
            );
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
