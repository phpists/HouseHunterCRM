import { useEffect } from "react";
import { CheckOption } from "../../../../components/CheckOption";
import { ProfileField } from "../../../../components/ProfileField";
import { Select } from "../../../../components/Select/Select";
import {
  useLazyGetBrandsQuery,
  useLazyGetCarBodyQuery,
  useLazyGetModelsQuery,
} from "../../../../store/objects/objects.api";

export const Fields = ({
  fields,
  data,
  notAllowedFields,
  commentsToFields,
  onChangeField,
  errors,
  collapsed,
  onOpenSelect,
}) => {
  const [getBrands, { data: brandsList }] = useLazyGetBrandsQuery();
  const [getModels, { data: modelsList }] = useLazyGetModelsQuery();
  const [getCarBody, { data: carBodyList }] = useLazyGetCarBodyQuery();

  useEffect(() => {
    getBrands(data.id_rubric);
    getCarBody(data.id_rubric);
  }, [data.id_rubric]);

  useEffect(() => {
    const idBrand = brandsList?.data?.find(
      (b) => b.id === data.id_brand
    )?.id_brand;
    console.log(idBrand);
    if (idBrand) {
      getModels({
        id_category: data.id_rubric,
        id_brand: idBrand,
      });
    }
  }, [data.id_brand, brandsList]);

  console.log(carBodyList);
  return (
    <div className="fields">
      {fields
        ? Object.entries(fields)
            .filter((field) => !notAllowedFields?.find((f) => f === field[0]))
            ?.sort((a, b) => a[1]?.sort - b[1]?.sort)
            ?.filter((field) =>
              collapsed
                ? field?.[1]?.collapsed === 1
                : field?.[1]?.collapsed === 0
            )
            .map((field) => {
              if (["id_brand", "id_model"].includes(field[0])) {
                return (
                  <Select
                    value={data[field[0]]}
                    options={
                      field[0] === "id_brand"
                        ? brandsList?.data
                          ? brandsList?.data?.map(({ name, id }) => ({
                              title: name,
                              value: id,
                            }))
                          : []
                        : modelsList?.data
                        ? modelsList?.data?.map(({ name, id }) => ({
                            title: name,
                            value: id,
                          }))
                        : []
                    }
                    onChange={(val) => onChangeField(field[0], val)}
                    label={commentsToFields?.object[field[0]] ?? "-"}
                    labelActive={commentsToFields?.object[field[0]] ?? "-"}
                    hideArrowDefault
                    error={!!errors.find((e) => e === field[0])}
                    onOpen={onOpenSelect}
                    isSearch
                  />
                );
              } else if (field[0] === "id_type_body") {
                return (
                  <Select
                    value={data[field[0]]}
                    options={
                      carBodyList?.data
                        ? carBodyList?.data?.map(({ name, id }) => ({
                            title: name,
                            value: id,
                          }))
                        : []
                    }
                    onChange={(val) => onChangeField(field[0], val)}
                    label={commentsToFields?.object[field[0]] ?? "-"}
                    labelActive={commentsToFields?.object[field[0]] ?? "-"}
                    hideArrowDefault
                    error={!!errors.find((e) => e === field[0])}
                    onOpen={onOpenSelect}
                  />
                );
              } else if (typeof field[1]?.field_option === "object") {
                return (
                  <Select
                    value={data[field[0]]}
                    options={Object.entries(field[1]?.field_option)?.map(
                      (opt) => ({ value: opt[0], title: opt[1] })
                    )}
                    onChange={(val) => onChangeField(field[0], val)}
                    label={commentsToFields?.object[field[0]] ?? "-"}
                    labelActive={commentsToFields?.object[field[0]] ?? "-"}
                    hideArrowDefault
                    error={!!errors.find((e) => e === field[0])}
                    onOpen={onOpenSelect}
                  />
                );
              } else if (field[1]?.type === "checkbox") {
                return (
                  <CheckOption
                    label={commentsToFields?.object[field[0]]}
                    value={data[field[0]]}
                    onChange={(val) => onChangeField(field[0], val)}
                  />
                );
              } else {
                return (
                  <ProfileField
                    placeholder="Введіть значення"
                    value={data[field[0]]}
                    onChange={(val) => onChangeField(field[0], val)}
                    label={field[0]}
                    className="field"
                    grey
                    type={field[1]?.type === "int" ? "number" : field[1]?.type}
                    error={!!errors.find((e) => e === field[0])}
                  />
                );
              }
            })
        : null}
    </div>
  );
};
