import styled from "styled-components";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";
import { Divider } from "./Divider";
import { Select } from "../../../../components/Select/Select";
import {
  useGetLocationsQuery,
  useGetRubricsQuery,
} from "../../../../store/requests/requests.api";
import React, { useRef, useState } from "react";
import {
  handleChangeRange,
  handleGetLocationAllPath,
  showAlert,
} from "../../../../utilits";
import { useEffect } from "react";
import { ProfileField } from "../../../../components/ProfileField";
import {
  useGetCommentsToFieldsQuery,
  useGetStreetsListQuery,
  useLazyGetBrandsQuery,
  useLazyGetCarBodyQuery,
  useLazyGetModelsQuery,
  useGetCarColorsQuery,
} from "../../../../store/objects/objects.api";
import { Price } from "../../../Request/Main/Price/Price";
import { IconButton } from "../../../../components/IconButton";
import { Base } from "../../../../components/Base/Base";
import { TagsFilter } from "../../../../components/TagsFilter/TagsFilter";
import { useGetPhonesCodesQuery } from "../../../../store/auth/auth.api";
import { Ranger } from "../../../../components/Ranger/Ranger";
import { MapButton } from "./MapButton";
import { ReactComponent as RemoveIcon } from "../../../../assets/images/remove.svg";
import { CheckOption } from "../../../../components/CheckOption";
import { ToggleOption } from "../../../../components/ToggleOption";
import { LocationSearch } from "../../../../components/LocationSearch/LocationSearch";
import { ColorSelect } from "../../../../components/ColorSelect";
import Accordion from "../../../../components/Accordions/Accordion";
import LocationsObjectsAccordion from "../../../../components/Accordions/LocationsObjectsAccordion";
import ObjectsFilterYear from "../../../../components/ObjectsFilterYear/ObjectsFilterYear";
import { VolumeEngine } from "../../../../components/VolumeEngine/VolumeEngine";
import MultipleAccordion from "../../../../components/Accordions/MultipleAccordion";
import { useAppSelect } from "../../../../hooks/redux";

export const notAllowedFields = [
  "comment",
  "description",
  "id_client",
  "id_location",
  "id_rubric",
  "label_without_animals",
  "label_without_children",
  "label_without_foreigners",
  "label_without_students",
  "title",
  "obj_is_actual",
  "obj_is_actual_dt",
  "photos_json",
  "price",
  "price_EUR",
  "price_UAH",
  "price_USD",
  "id_location_street",
  "is_actual_to_dt_end_agreement",
  "address_house_number",
  "price_history_json",
  "price_for",
  "price_currency",
  "label_fake",
  "label_without_animals",
  "label_without_children",
  "label_without_foreigners",
  "label_without_students",
  "type_obj_apartment",
  "type_obj_house",
  "type_obj_commerce",
  "type_obj_garage",
  "liquidity",
];

export const notAllowedFieldsForRubricFive = [
  "volume_engine",
  "id_ecological_standard",
  "сar_mileage",
  "kpp",
  "drive_type",
  "id_type_fuel",
  "id_type_body",
];

export const Main = ({
  close,
  filters,
  onChangeFilter,
  onChangeDefaultFiltersOpened,
  filtersOpened,
  errors,
  onChangeInputFocus,
  isInputFocused,
  phoneCode,
  onChangePhoneCode,
  onOpenMap,
}) => {
  const { filtersFields } = useAppSelect((state) => state.objects);
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const { data: rubricsList } = useGetRubricsQuery();
  const { data: locationsList } = useGetLocationsQuery();
  const [formatedLocations, setFormatedLocations] = useState([]);
  const { data: phonesCodes } = useGetPhonesCodesQuery();
  const [getBrands, { data: brandsList }] = useLazyGetBrandsQuery();
  const [getModels, { data: modelsList }] = useLazyGetModelsQuery();
  const [getCarBody, { data: carBodyList }] = useLazyGetCarBodyQuery();
  const { data: carColors = [] } = useGetCarColorsQuery();

  const kppOptions = (options) =>
    Object.entries(options).map(([value, title]) => ({
      title,
      value,
    }));

  useEffect(() => {
    if (filters?.id_rubric) {
      getBrands(filters.id_rubric);
      getCarBody(filters.id_rubric);
    }

    if (!filters?.id_rubric) {
      onChangeFilter("id_rubric", "1");
    }
  }, [filters.id_rubric]);

  useEffect(() => {
    const idBrand = brandsList?.data?.find(
      (b) => b.id === filters.id_brand
    )?.id_brand;
    if (idBrand) {
      getModels({
        id_category: filters.id_rubric,
        id_brand: idBrand,
      });
    }
  }, [filters.id_brand, brandsList]);

  const handleFormatLocations = () => {
    const locList = Object.entries(locationsList)?.map((loc) => loc[1]);
    const locations = Object.entries(locationsList)
      .sort((a, b) => Number(b[1].id_parent) - Number(a[1].id_parent))
      ?.map((loc) => loc[1])
      //   .filter((loc) => Number(loc?.id_parent) !== 0)
      .map(({ id, id_parent, name }) => {
        return handleGetLocationAllPath(locList, id, id_parent, name);
      });

    setFormatedLocations(locations);
  };

  useEffect(() => {
    if (locationsList) {
      handleFormatLocations();
    }
  }, [locationsList]);

  const handleChangeStreetsField = (val) => {
    const currentValue = Array.isArray(filters?.list_street)
      ? filters?.list_street
      : [];

    const isExist = currentValue.includes(val);
    const updatedValue = isExist
      ? currentValue?.filter((v) => v !== val)
      : [...currentValue, val];

    onChangeFilter("list_street", updatedValue);
  };

  const selects = filtersFields?.main_field
    ? Object.entries(filtersFields?.main_field)
        .filter((field) => !notAllowedFields?.find((f) => f === field[0]))
        .filter((field) =>
          filters.id_rubric === "5"
            ? !notAllowedFieldsForRubricFive?.find((f) => f === field[0])
            : true
        )
        .filter((field) =>
          filters.id_rubric === "5"
            ? true
            : !["id_technical_condition"]?.find((f) => f === field[0])
        )
        ?.filter((field) => commentsToFields?.object[field[0]]?.length > 0)
        ?.sort((a, b) => a[1]?.sort - b[1]?.sort)
    : null;

  const handleKppChange = (selectedValues) => {
    let current = Array.isArray(filters?.kpp) ? filters.kpp : [];
    let result = [...current];

    selectedValues.forEach((val) => {
      if (result.includes(val)) {
        result = result.filter((f) => f !== val);
      } else {
        result.push(val);
      }
    });

    onChangeFilter("kpp", result);
  };

  return (
    <StyledMain className="section filterFieldsWrapper">
      <Accordion
        close={close}
        hideClearBtn
        hideSearch
        active={filters?.id_rubric}
        label={"Категорія"}
        options={
          rubricsList
            ? rubricsList?.map(({ id, name }) => ({ title: name, value: id }))
            : []
        }
        onChange={(val) => {
          onChangeFilter("id_rubric", val === filters?.id_rubric ? null : val);
        }}
        categoryFilter
      />
      <Divider />

      <LocationsObjectsAccordion
        active={filters?.id_location || []}
        close={close}
        options={
          rubricsList
            ? rubricsList?.map(({ id, name }) => ({ title: name, value: id }))
            : []
        }
        onChange={(val) => onChangeFilter("id_location", val)}
      />
      <Divider />
      <Price
        values={[filters?.price_min ?? "0", filters?.price_max ?? "0"]}
        onChange={(values) =>
          handleChangeRange(
            values,
            [filters?.price_min ?? "0", filters?.price_max ?? "0"],
            ["price_min", "price_max"],
            (values) =>
              onChangeFilter("update", { ...filters, ...values }, true),
            true
          )
        }
        currency={Number(filters?.price_currency)}
        onChangeCurrency={(val) => onChangeFilter("price_currency", val)}
        onFocus={() => !isInputFocused && onChangeInputFocus(true)}
        onBlur={() => onChangeInputFocus(false)}
        isType
        allTypes
        rubricId={filters?.id_rubric}
        typeValue={filters?.price_for}
        onChangeType={(val) => onChangeFilter("price_for", val)}
        // hideCurrency
      />
      <Divider />
      <ObjectsFilterYear
        initial={[filters?.year_from ?? 0, filters?.year_to ?? 0]}
        onSubmit={(values) => {
          handleChangeRange(
            values,
            [filters[`year_from`] ?? 0, filters[`year_to`] ?? 0],
            [`year_from`, `year_to`],
            (values) =>
              onChangeFilter("update", { ...filters, ...values }, true)
          );
        }}
      />
      <Divider />
      {selects?.map((select) => {
        if (select[0] === "id_type_fuel") {
          return (
            <React.Fragment key={select[0]}>
              <Accordion
                hideSearch
                active={filters?.id_type_fuel}
                label={"Тип палива"}
                options={Object.entries(select[1].field_option).map(
                  ([value, title]) => ({
                    title,
                    value,
                  })
                )}
                onChange={(val) => {
                  onChangeFilter(
                    "id_type_fuel",
                    val === filters?.id_type_fuel ? null : val
                  );
                }}
              />
              <Divider />
            </React.Fragment>
          );
        }
      })}
      {selects?.map((select) => {
        if (select[0] === "volume_engine") {
          return (
            <React.Fragment key={select[0]}>
              <VolumeEngine
                mainType={"л"}
                label={"Об'єм"}
                max={100}
                values={[
                  filters?.volume_engine_from ?? "0",
                  filters?.volume_engine_to ?? "0",
                ]}
                stepSize={0.1}
                onFocus={() => !isInputFocused && onChangeInputFocus(true)}
                onBlur={() => onChangeInputFocus(false)}
                onChange={(values) => {
                  handleChangeRange(
                    values,
                    [
                      filters[`volume_engine_from`] ?? 0,
                      filters[`volume_engine_to`] ?? 0,
                    ],
                    [`volume_engine_from`, `volume_engine_to`],
                    (values) =>
                      onChangeFilter("update", { ...filters, ...values }, true)
                  );
                }}
                noCeil
              />
              <Divider />
            </React.Fragment>
          );
        }
      })}

      {selects?.map((select) => {
        if (select[0] === "kpp") {
          const options = kppOptions(select[1].field_option);

          return (
            <React.Fragment key={select[0]}>
              <MultipleAccordion
                hideSearch
                kpp
                active={options.filter((opt) =>
                  Array.isArray(filters?.kpp)
                    ? filters.kpp.includes(opt.value)
                    : filters?.kpp === opt.value
                )}
                label={"Коробка передач"}
                options={options}
                onChange={(val) => {
                  onChangeFilter("kpp", val);
                }}
              />
              <Divider />
            </React.Fragment>
          );
        }
      })}

      {selects?.map((select) => {
        if (select[0] === "drive_type") {
          return (
            <React.Fragment key={select[0]}>
              <Accordion
                active={filters?.drive_type}
                label={"Привід"}
                hideSearch
                options={Object.entries(select[1].field_option).map(
                  ([value, title]) => ({
                    title,
                    value,
                  })
                )}
                onChange={(val) => {
                  onChangeFilter(
                    "drive_type",
                    val === filters?.drive_type ? null : val
                  );
                }}
              />
            </React.Fragment>
          );
        }
      })}
    </StyledMain>
  );
};

const StyledMain = styled.div`
  .first-angle,
  .second-angle {
    &::after {
      background: var(--bg-78-heck) !important;
    }
  }

  .base-wrapper {
    background: none;
  }
  .fields-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .filter-range-wrapper {
    grid-column: 1/3;
  }
  .streetsWrapper-btns {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-left: 10px;
    .iconButton {
      width: 30px;
      height: 30px;
    }
  }
`;
