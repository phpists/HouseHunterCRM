import styled from "styled-components";
import { CheckOption } from "../../../../components/CheckOption";
import {
  useGetLocationsQuery,
  useGetRubricsQuery,
} from "../../../../store/requests/requests.api";
import { useState } from "react";
import {
  handleChangeRange,
  handleGetFieldsOptions,
  handleGetLocationAllPath,
} from "../../../../utilits";
import { useEffect } from "react";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";
import { Divider } from "./Divider";
import { Price } from "../../../Request/Main/Price/Price";
import { Ranger } from "../../../../components/Ranger/Ranger";
import { ToggleOption } from "./ToggleOption";

export const Tags = ({
  filters,
  onChangeFilter,
  filtersFields,
  onChangeInputFocus,
  isInputFocused,
}) => {
  const { data: rubricsList } = useGetRubricsQuery();
  const { data: locationsList } = useGetLocationsQuery();
  const [formatedLocations, setFormatedLocations] = useState([]);

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

  return (
    <StyledTags>
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
        notMultiSelect
        value={filters?.id_location}
        onChange={(val) =>
          onChangeFilter(
            "id_location",
            val === filters?.id_location ? null : val
          )
        }
        options={formatedLocations}
      />
      <Divider />
      <Price
        values={[filters?.price_min ?? 0, filters?.price_max ?? 0]}
        onChange={(values) =>
          handleChangeRange(
            values,
            [filters?.price_min ?? 0, filters?.price_max ?? 0],
            ["price_min", "price_max"],
            onChangeFilter
          )
        }
        currency={Number(filters?.price_currency)}
        onChangeCurrency={(val) => onChangeFilter("price_currency", val)}
        isType
        allTypes
        rubricId={filters?.id_rubric}
        typeValue={filters?.price_for}
        onChangeType={(val) => onChangeFilter("price_for", val)}
        onFocus={() => !isInputFocused && onChangeInputFocus(true)}
        onBlur={() => onChangeInputFocus(false)}
      />
      <Divider />
      {filtersFields && handleGetFieldsOptions(filtersFields, "room_min") && (
        <Ranger
          label="Кількість кімнат/Приміщень"
          max={100}
          values={[filters?.room_min ?? 0, filters?.room_max ?? 0]}
          onChange={(values) =>
            handleChangeRange(
              values,
              [filters?.room_min ?? 0, filters?.room_max ?? 0],
              ["room_min", "room_max"],
              onChangeFilter
            )
          }
          onFocus={() => !isInputFocused && onChangeInputFocus(true)}
          onBlur={() => onChangeInputFocus(false)}
        />
      )}
      {filtersFields &&
        handleGetFieldsOptions(filtersFields, "area_total_min") && (
          <>
            {handleGetFieldsOptions(filtersFields, "room_min") && <Divider />}
            <Ranger
              label="Загальна площа"
              max={10000}
              defaultStart={20}
              defaultEnd={40}
              mainType={
                <>
                  m<sup>2</sup>
                </>
              }
              values={[
                filters?.area_total_min ?? 0,
                filters?.area_total_max ?? 0,
              ]}
              onChange={(values) =>
                handleChangeRange(
                  values,
                  [filters?.area_total_min ?? 0, filters?.area_total_max ?? 0],
                  ["area_total_min", "area_total_max"],
                  onChangeFilter
                )
              }
              onFocus={() => !isInputFocused && onChangeInputFocus(true)}
              onBlur={() => onChangeInputFocus(false)}
            />
          </>
        )}
      {filtersFields &&
        handleGetFieldsOptions(filtersFields, "address_storey") && (
          <>
            <Divider />
            <Ranger
              label="Поверх/Поверховість"
              max={100}
              values={[
                filters?.address_storey ?? 0,
                filters?.storey_count ?? 0,
              ]}
              onChange={(values) =>
                handleChangeRange(
                  values,
                  [filters?.address_storey ?? 0, filters?.storey_count ?? 0],
                  ["address_storey", "storey_count"],
                  onChangeFilter
                )
              }
              onFocus={() => !isInputFocused && onChangeInputFocus(true)}
              onBlur={() => onChangeInputFocus(false)}
            />
          </>
        )}
      {filtersFields &&
        handleGetFieldsOptions(filtersFields, "area_plot_sotka_min") && (
          <>
            <Divider />
            <Ranger
              label="Площа ділянки "
              max={100}
              values={[
                filters?.area_plot_sotka_min ?? 0,
                filters?.area_plot_sotka_max ?? 0,
              ]}
              onChange={(values) =>
                handleChangeRange(
                  values,
                  [
                    filters?.area_plot_sotka_min ?? 0,
                    filters?.area_plot_sotka_max ?? 0,
                  ],
                  ["area_plot_sotka_min", "area_plot_sotka_max"],
                  onChangeFilter
                )
              }
              onFocus={() => !isInputFocused && onChangeInputFocus(true)}
              onBlur={() => onChangeInputFocus(false)}
            />
          </>
        )}
      {filtersFields &&
        handleGetFieldsOptions(filtersFields, "type_obj_garage")?.length >
          0 && (
          <>
            <Divider />
            <SelectTags
              label="Тип гаража"
              placeholder="Оберіть тип гаража"
              notMultiSelect
              options={handleGetFieldsOptions(filtersFields, "type_obj_garage")}
              value={filters?.type_obj_garage}
              onChange={(val) => onChangeFilter("type_obj_garage", val)}
            />
          </>
        )}
      {filtersFields &&
        handleGetFieldsOptions(filtersFields, "type_obj_apartment")?.length >
          0 && (
          <>
            <Divider />
            <SelectTags
              label="Тип багатоповерхівки"
              placeholder="Оберіть тип багатоповерхівки"
              notMultiSelect
              options={handleGetFieldsOptions(
                filtersFields,
                "type_obj_apartment"
              )}
              value={filters?.type_obj_apartment}
              onChange={(val) => onChangeFilter("type_obj_apartment", val)}
            />
          </>
        )}
      {filtersFields &&
        handleGetFieldsOptions(filtersFields, "type_obj_commerce")?.length >
          0 && (
          <>
            <Divider />
            <SelectTags
              label="Тип комерції"
              placeholder="Оберіть тип комерції"
              notMultiSelect
              options={handleGetFieldsOptions(
                filtersFields,
                "type_obj_commerce"
              )}
              value={filters?.type_obj_commerce}
              onChange={(val) => onChangeFilter("type_obj_commerce", val)}
            />
          </>
        )}
      {filtersFields &&
        handleGetFieldsOptions(filtersFields, "type_obj_house")?.length > 0 && (
          <>
            <Divider />
            <SelectTags
              label="Тип будинку"
              placeholder="Оберіть тип будинку"
              notMultiSelect
              options={handleGetFieldsOptions(filtersFields, "type_obj_house")}
              value={filters?.type_obj_house}
              onChange={(val) => onChangeFilter("type_obj_house", val)}
            />
          </>
        )}
      {filtersFields &&
        handleGetFieldsOptions(filtersFields, "type_obj_hotel")?.length > 0 && (
          <>
            <SelectTags
              label="Тип готелю"
              placeholder="Оберіть тип готелю"
              notMultiSelect
              options={handleGetFieldsOptions(filtersFields, "type_obj_hotel")}
              value={filters?.type_obj_hotel}
              onChange={(val) => onChangeFilter("type_obj_hotel", val)}
            />
          </>
        )}{" "}
      {filtersFields &&
        handleGetFieldsOptions(filtersFields, "type_obj_hotel")?.length > 0 && (
          <>
            <Divider />
            <SelectTags
              label="Тип готелю"
              placeholder="Оберіть тип готелю"
              notMultiSelect
              options={handleGetFieldsOptions(filtersFields, "type_obj_hotel")}
              value={filters?.type_obj_hotel}
              onChange={(val) => onChangeFilter("type_obj_hotel", val)}
            />
          </>
        )}
      <CheckOption
        label="Запити компанії"
        className="check-opt"
        value={filters?.only_company_obj}
        onChange={(val) =>
          onChangeFilter(
            "only_company_obj",
            {
              ...filters,
              only_company_obj: "1",
              only_street_base_obj: "0",
              only_my_obj: "0",
              only_my_structure: "0",
            },
            true
          )
        }
      />
      <CheckOption
        label="Мої запити"
        className="check-opt"
        value={filters?.only_my_obj}
        onChange={(val) =>
          onChangeFilter(
            "only_my_obj",
            {
              ...filters,
              only_company_obj: "0",
              only_street_base_obj: "0",
              only_my_obj: "1",
              only_my_structure: "0",
            },
            true
          )
        }
      />
      <CheckOption
        label="Запити моєї структури"
        className="check-opt"
        value={filters?.only_my_structure}
        onChange={(val) =>
          onChangeFilter(
            "only_my_structure",
            {
              ...filters,
              only_company_obj: "0",
              only_street_base_obj: "0",
              only_my_obj: "0",
              only_my_structure: "1",
            },
            true
          )
        }
      />
      <Divider />
      <ToggleOption
        label="Протерміновані запити"
        active={filters?.showDeadline === "1"}
        onChange={() =>
          onChangeFilter(
            "showUnreadMessege",
            {
              ...filters,
              show_deleted: undefined,
              showDeadline: filters?.showDeadline === "1" ? "0" : "1",
            },
            true
          )
        }
      />
      <Divider />
      <ToggleOption
        label="Не переглянуті повідомлення із підбірок"
        active={filters?.showUnreadMessege === "1"}
        onChange={() =>
          onChangeFilter(
            "showUnreadMessege",
            {
              ...filters,
              show_deleted: undefined,
              showUnreadMessege: filters?.showUnreadMessege === "1" ? "0" : "1",
            },
            true
          )
        }
      />
      <Divider />
      <ToggleOption
        label="Запити до видалення"
        active={filters?.show_deleted === "1"}
        onChange={() =>
          onChangeFilter(
            "showUnreadMessege",
            {
              ...filters,
              show_deleted: filters?.show_deleted === "1" ? undefined : "1",
              showUnreadMessege: "0",
              showDeadline: "0",
            },
            true
          )
        }
      />
    </StyledTags>
  );
};

const StyledTags = styled.div`
  padding: 8px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 25px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  gap: 6px;
`;
