import React, { useEffect } from "react";
import {
  notAllowedFields,
  notAllowedFieldsForRubricFive,
} from "../../pages/Objects/Header/Filter/Main";
import {
  useGetCarColorsQuery,
  useGetCommentsToFieldsQuery,
  useLazyGetBrandsQuery,
  useLazyGetCarBodyQuery,
  useLazyGetModelsQuery,
} from "../../store/objects/objects.api";
import { handleChangeRange } from "../../utilits";
import Accordion from "../Accordions/Accordion";
import { Divider } from "../Base/Divider";
import { VolumeEngine } from "../VolumeEngine/VolumeEngine";
import { CheckOption } from "../CheckOption";
import { useAppSelect } from "../../hooks/redux";

const Features = ({
  data,
  onChangeFilter,
  onChangeInputFocus,
  isInputFocused,
}) => {
  const { filtersFields } = useAppSelect((state) => state.objects);
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const [getBrands, { data: brandsList }] = useLazyGetBrandsQuery();
  const [getModels, { data: modelsList }] = useLazyGetModelsQuery();
  const [getCarBody, { data: carBodyList }] = useLazyGetCarBodyQuery();
  const { data: carColors = [] } = useGetCarColorsQuery();

  useEffect(() => {
    if (data?.id_rubric) {
      getBrands(data.id_rubric);
      getCarBody(data.id_rubric);
    }
  }, [data.id_rubric]);

  useEffect(() => {
    const idBrand = brandsList?.data?.find(
      (b) => b.id === data.id_brand
    )?.id_brand;
    if (idBrand) {
      getModels({
        id_category: data.id_rubric,
        id_brand: idBrand,
      });
    }
  }, [data.id_brand, brandsList]);

  const selects = filtersFields?.main_field
    ? Object.entries(filtersFields?.main_field)
        .filter((field) => !notAllowedFields?.find((f) => f === field[0]))
        .filter((field) =>
          data.id_rubric === "5"
            ? !notAllowedFieldsForRubricFive?.find((f) => f === field[0])
            : true
        )
        .filter((field) =>
          data.id_rubric === "5"
            ? true
            : !["id_technical_condition"]?.find((f) => f === field[0])
        )
        ?.filter((field) => commentsToFields?.object[field[0]]?.length > 0)
        ?.sort((a, b) => a[1]?.sort - b[1]?.sort)
    : null;

  return (
    <div className="section filterFieldsWrapper">
      <VolumeEngine
        mainType={"т.км"}
        onFocus={() => !isInputFocused && onChangeInputFocus(true)}
        onBlur={() => onChangeInputFocus(false)}
        label={"Пробіг тис. км."}
        max={1000}
        values={[data?.сar_mileage_from ?? "0", data?.сar_mileage_to ?? "0"]}
        onChange={(values) => {
          handleChangeRange(
            values,
            [data[`сar_mileage_from`] ?? 0, data[`сar_mileage_to`] ?? 0],
            [`сar_mileage_from`, `сar_mileage_to`],
            (values) => onChangeFilter("update", { ...data, ...values }, true)
          );
        }}
      />
      <Divider />
      {selects?.map((select) => {
        if (select[0] === "id_brand") {
          return (
            <React.Fragment key={select[0]}>
              <Accordion
                active={data?.id_brand}
                label={"Марка"}
                options={
                  brandsList?.data
                    ? brandsList?.data?.map(({ name, id }) => ({
                        title: name,
                        value: id,
                      }))
                    : []
                }
                onChange={(val) => onChangeFilter("id_brand", val)}
              />
              <Divider />
            </React.Fragment>
          );
        }
      })}
      {selects?.map((select) => {
        if (select[0] === "id_model") {
          return (
            <React.Fragment key={select[0]}>
              <Accordion
                active={data?.id_model}
                label={"Модель"}
                options={
                  modelsList?.data
                    ? modelsList?.data?.map(({ name, id }) => ({
                        title: name,
                        value: id,
                      }))
                    : []
                }
                onChange={(val) => onChangeFilter("id_model", val)}
              />
              <Divider />
            </React.Fragment>
          );
        }
      })}
      {selects?.map((select) => {
        if (select[0] === "id_type_body") {
          return (
            <React.Fragment key={select[0]}>
              <Accordion
                hideSearch
                active={data?.id_type_body}
                label={"Тип кузова"}
                options={
                  carBodyList?.data
                    ? carBodyList?.data?.map(({ name, id }) => ({
                        title: name,
                        value: id,
                      }))
                    : []
                }
                onChange={(val) => onChangeFilter("id_type_body", val)}
              />
              <Divider />
            </React.Fragment>
          );
        }
      })}
      {selects?.map((select) => {
        if (select[0] === "id_custom") {
          return (
            <React.Fragment key={select[0]}>
              <Accordion
                hideSearch
                active={data?.id_custom}
                label={"Розмитнені/Не розмитнені"}
                options={Object.entries(select[1]?.field_option)?.map(
                  (opt) => ({ value: opt[0], title: opt[1] })
                )}
                onChange={(val) => onChangeFilter("id_custom", val)}
              />
              <Divider />
            </React.Fragment>
          );
        }
      })}
      <VolumeEngine
        onFocus={() => !isInputFocused && onChangeInputFocus(true)}
        onBlur={() => onChangeInputFocus(false)}
        label={"к-ть оголошень автора (відключіть перекупа)"}
        values={[
          data?.street_base_object?.count_object_owner_from,
          data?.street_base_object?.count_object_owner_to,
        ]}
        onChange={(values) => {
          handleChangeRange(
            values,
            [
              data?.street_base_object?.count_object_owner_from ?? 0,
              data?.street_base_object?.count_object_owner_to ?? 0,
            ],
            ["count_object_owner_from", "count_object_owner_to"],
            (values) =>
              onChangeFilter("street_base_object", {
                ...data?.street_base_object,
                ...values,
              }),
            true
          );
        }}
      />
      <Divider />
      <Accordion
        hideSearch
        active={data?.id_color}
        label={"Колір"}
        options={carColors.map(({ id, name }) => ({
          title: name,
          value: id,
        }))}
        onChange={(val) => onChangeFilter("id_color", val)}
      />
      <Divider />
      <CheckOption
        label="Обмін"
        className="check-opt"
        value={data?.street_base_object?.exchangePossible}
        onChange={(val) =>
          onChangeFilter("street_base_object", {
            ...data?.street_base_object,
            exchangePossible:
              data?.street_base_object?.exchangePossible === "1"
                ? undefined
                : "1",
          })
        }
      />
    </div>
  );
};

export default Features;
