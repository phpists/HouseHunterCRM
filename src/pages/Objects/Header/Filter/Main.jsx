import styled from "styled-components";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";
import { Divider } from "./Divider";
import { Select } from "../../../../components/Select/Select";
import {
  useGetLocationsQuery,
  useGetRubricsQuery,
} from "../../../../store/requests/requests.api";
import { useState } from "react";
import {
  handleChangeRange,
  handleGetLocationAllPath,
} from "../../../../utilits";
import { useEffect } from "react";
import { ProfileField } from "../../../../components/ProfileField";
import {
  useGetCommentsToFieldsQuery,
  useGetStreetsListQuery,
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

const notAllowedFields = [
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

export const Main = ({
  filters,
  onChangeFilter,
  filtersFields,
  onChangeDefaultFiltersOpened,
  filtersOpened,
  errors,
  onChangeInputFocus,
  isInputFocused,
  phoneCode,
  onChangePhoneCode,
  onOpenMap,
}) => {
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const { data: rubricsList } = useGetRubricsQuery();
  const { data: locationsList } = useGetLocationsQuery();
  const [formatedLocations, setFormatedLocations] = useState([]);
  const { data: phonesCodes } = useGetPhonesCodesQuery();
  const { data: streets } = useGetStreetsListQuery();

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

  return (
    <StyledMain className="section filterFieldsWrapper">
      <SelectTags
        label="Категорія"
        notMultiSelect
        value={filters?.id_rubric}
        onChange={(val) =>
          onChangeFilter("id_rubric", val === filters?.id_rubric ? null : val)
        }
        options={
          rubricsList
            ? rubricsList?.map(({ id, name }) => ({ title: name, value: id }))
            : []
        }
      />
      <Divider />
      <SelectTags
        label="Локація"
        tags={formatedLocations?.filter(
          (l) => !!filters?.id_location?.find((v) => v === l.value)
        )}
        onChange={(val) => {
          onChangeFilter(
            "id_location",
            filters?.id_location?.find((l) => l === val)
              ? filters?.id_location?.filter((l) => l !== val)
              : [...(filters?.id_location ? filters?.id_location : []), val]
          );
        }}
        options={formatedLocations}
        showTags
      />
      <Divider />
      <div className="flex items-start">
        <SelectTags
          label="Пошук по вулиці"
          tags={
            Array.isArray(filters?.list_street)
              ? filters?.list_street?.map((v) => ({ title: v, value: v }))
              : []
          }
          onChange={handleChangeStreetsField}
          options={
            streets
              ? Object.entries(streets)
                  ?.filter((s) => s?.[0] !== "error")
                  ?.map((s) => ({
                    title: s?.[1]?.name,
                    value: s?.[1]?.name,
                  }))
              : []
          }
          className="w-full streetsWrapper"
          showTags
        />
        <div className="streetsWrapper-btns">
          <MapButton onOpenMap={onOpenMap} />
          {filters?.list_street?.length > 0 ? (
            <IconButton
              Icon={RemoveIcon}
              onClick={(val) => onChangeFilter("list_street", [])}
            />
          ) : null}
        </div>
      </div>
      <Divider />
      <Price
        values={[filters?.price_min ?? "0", filters?.price_max ?? "0"]}
        onChange={(values) =>
          handleChangeRange(
            values,
            [filters?.price_min ?? "0", filters?.price_max ?? "0"],
            ["price_min", "price_max"],
            onChangeFilter
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
      />
      <Divider />
      <TagsFilter
        label="Пошук 1"
        search
        tags={Array.isArray(filters?.search_like) ? filters?.search_like : []}
        onChange={(val) => onChangeFilter("search_like", val)}
      />
      <Divider />
      <TagsFilter
        label="Пошук 2"
        search
        tags={Array.isArray(filters?.search_like2) ? filters?.search_like2 : []}
        onChange={(val) => onChangeFilter("search_like2", val)}
      />
      <Divider />
      <TagsFilter
        label="Пошук виключення"
        search
        tags={
          Array.isArray(filters?.search_not_like)
            ? filters?.search_not_like
            : []
        }
        onChange={(val) => onChangeFilter("search_not_like", val)}
      />

      <Divider />
      <ProfileField
        placeholder="Введіть значення"
        value={filters?.id_hash}
        onChange={(val) => onChangeFilter("id_hash", val)}
        label="Пошук по id системи"
        className="field"
        grey
        onFocus={() => onChangeInputFocus(true)}
        onBlur={() => onChangeInputFocus(false)}
      />
      <Divider />
      <ProfileField
        label="Пошук по телефону"
        placeholder="Введіть значення..."
        value={filters.search_phone}
        onChange={(val) => onChangeFilter("search_phone", val)}
        phone
        phonesCodes={phonesCodes}
        phoneCode={phoneCode}
        onChangePhoneCode={(val) => onChangePhoneCode(val)}
        error={errors?.search_phone}
        onFocus={() => onChangeInputFocus(true)}
        onBlur={() => onChangeInputFocus(false)}
      />
      <Divider />
      <ProfileField
        label="Пошук по номеру часткове співпадіння"
        placeholder="Введіть значення..."
        value={filters?.findPhone}
        onChange={(val) => onChangeFilter("findPhone", val)}
        onFocus={() => onChangeInputFocus(true)}
        onBlur={() => onChangeInputFocus(false)}
        type="number"
      />

      <div className="fields-wrapper">
        {filtersFields?.main_field
          ? Object.entries(filtersFields?.main_field)
              .filter((field) => !notAllowedFields?.find((f) => f === field[0]))
              ?.filter(
                (field) => commentsToFields?.object[field[0]]?.length > 0
              )
              ?.sort((a, b) => a[1]?.sort - b[1]?.sort)
              .map((field) => {
                if (field[0] === "mls") {
                  return null;
                }
                const rangeFields = [
                  "area_total",
                  "area_dwelling_place",
                  "area_kitchen",
                  "rooms",
                  "address_storey",
                  "storey_count",
                  "area_plot_sotka",
                ];

                const labels = {
                  room_min: "Кількість кімнат/Приміщень",
                  storey_count_min: "Поверховість",
                  area_total_min:
                    commentsToFields?.object?.area_total ?? "Площа",
                  area_plot_sotka_min:
                    commentsToFields?.object?.area_plot_sotka ??
                    "Площа ділянки",
                  address_storey_min: "Поверх від/до",
                };

                const fieldName = field[0] === "rooms" ? "room" : field[0];

                if (rangeFields.includes(field[0])) {
                  return (
                    <>
                      <Ranger
                        label={
                          labels?.[field[0]] ??
                          commentsToFields?.object[field[0]]
                        }
                        max={100}
                        values={[
                          filters[`${fieldName}_min`] ?? 0,
                          filters[`${fieldName}_max`] ?? 0,
                        ]}
                        className="filter-range-wrapper"
                        onChange={(values) =>
                          handleChangeRange(
                            values,
                            [
                              filters[`${fieldName}_min`] ?? 0,
                              filters[`${fieldName}_max`] ?? 0,
                            ],
                            [`${fieldName}_min`, `${fieldName}_max`],
                            onChangeFilter
                          )
                        }
                        onFocus={() =>
                          !isInputFocused && onChangeInputFocus(true)
                        }
                        onBlur={() => onChangeInputFocus(false)}
                      />
                      {fieldName === "storey_count" ? (
                        <>
                          <ToggleOption
                            label="Не перший поверх"
                            className="check-opt filter-range-wrapper"
                            value={filters?.not_first_storey}
                            onChange={() =>
                              onChangeFilter(
                                "not_first_storey",
                                filters?.not_first_storey ? undefined : "1"
                              )
                            }
                          />
                          <ToggleOption
                            label="Не останній поверх"
                            className="check-opt filter-range-wrapper"
                            value={filters?.not_last_storey}
                            onChange={() =>
                              onChangeFilter(
                                "not_last_storey",
                                filters?.not_last_storey ? undefined : "1"
                              )
                            }
                          />
                        </>
                      ) : null}
                    </>
                  );
                } else if (typeof field[1]?.field_option === "object") {
                  return (
                    <>
                      {/* <Divider /> */}
                      <Select
                        value={filters[field[0]]}
                        options={Object.entries(field[1]?.field_option)?.map(
                          (opt) => ({ value: opt[0], title: opt[1] })
                        )}
                        onChange={(val) => onChangeFilter(field[0], val)}
                        label={commentsToFields?.object[field[0]]}
                        labelActive={commentsToFields?.object[field[0]]}
                        hideArrowDefault
                      />
                    </>
                  );
                } else {
                  if (field[1]?.type === "date") {
                    return null;
                  }
                  return (
                    <>
                      {/* <Divider /> */}
                      <ProfileField
                        placeholder="Введіть значення"
                        value={filters[field[0]]}
                        onChange={(val) => onChangeFilter(field[0], val)}
                        label={commentsToFields?.object[field[0]]}
                        className="field"
                        grey
                        type={
                          field[1]?.type === "int" ? "number" : field[1]?.type
                        }
                        onFocus={() => onChangeInputFocus(true)}
                        onBlur={() => onChangeInputFocus(false)}
                      />
                    </>
                  );
                }
              })
          : null}
      </div>
      <Base
        className="base-wrapper"
        data={filters}
        onChange={onChangeFilter}
        streetBaseOpen={filtersOpened?.street_base_object}
        mlsBaseOpen={filtersOpened?.mls_object}
        companyOpen={filtersOpened?.company}
        onChangeDefaultFiltersOpened={(fieldName, value) =>
          onChangeDefaultFiltersOpened({
            ...filtersOpened,
            [fieldName]: value,
          })
        }
        dateAgreement
        idAdInSource
        showDeleted
        workersSearch
        potentialOwner
        idSource
        objMls
        countObjectOwner
        allObjectsWorker
        publicAccess
        onlyNotmyClient
        notCommentAndTags
        showTagsObjarray
        hideAdvertsAdd
        onFocus={() => onChangeInputFocus(true)}
        onBlur={() => onChangeInputFocus(false)}
        hidePicaroon
        liquidity
      />
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
