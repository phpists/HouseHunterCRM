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

export const Card = ({ title, fields, data, onChangeField, errors }) => (
  <StyledCard>
    <TitleDivider title={title} />
    {fields && handleGetFieldsOptions(fields, "room_min") && (
      <Ranger
        label="Кількість кімнат/Приміщень"
        max={100}
        values={[data?.room_min ?? 0, data?.room_max ?? 0]}
        onChange={(values) =>
          handleChangeRange(
            values,
            [data?.room_min ?? 0, data?.room_max ?? 0],
            ["room_min", "room_max"],
            onChangeField
          )
        }
        error={
          !!errors?.find((e) => e === "room_min") ||
          !!errors?.find((e) => e === "room_max")
        }
      />
    )}
    {fields && handleGetFieldsOptions(fields, "area_total_min") && (
      <>
        {handleGetFieldsOptions(fields, "room_min") && <Divider />}
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
          values={[data?.area_total_min ?? 0, data?.area_total_max ?? 0]}
          onChange={(values) =>
            handleChangeRange(
              values,
              [data?.area_total_min ?? 0, data?.area_total_max ?? 0],
              ["area_total_min", "area_total_max"],
              onChangeField
            )
          }
          error={
            !!errors?.find((e) => e === "area_total_min") ||
            !!errors?.find((e) => e === "area_total_max")
          }
        />
      </>
    )}
    {fields && handleGetFieldsOptions(fields, "address_storey") && (
      <>
        <Divider />
        <Ranger
          label="Поверх/Поверховість"
          max={100}
          values={[data?.address_storey ?? 0, data?.storey_count ?? 0]}
          onChange={(values) =>
            handleChangeRange(
              values,
              [data?.address_storey ?? 0, data?.storey_count ?? 0],
              ["address_storey", "storey_count"],
              onChangeField
            )
          }
          error={
            !!errors?.find((e) => e === "address_storey") ||
            !!errors?.find((e) => e === "storey_count")
          }
        />
      </>
    )}
    {fields && handleGetFieldsOptions(fields, "area_plot_sotka_min") && (
      <>
        <Divider />
        <Ranger
          label="Площа ділянки "
          max={100}
          values={[
            data?.area_plot_sotka_min ?? 0,
            data?.area_plot_sotka_max ?? 0,
          ]}
          onChange={(values) =>
            handleChangeRange(
              values,
              [data?.area_plot_sotka_min ?? 0, data?.area_plot_sotka_max ?? 0],
              ["area_plot_sotka_min", "area_plot_sotka_max"],
              onChangeField
            )
          }
          error={
            !!errors?.find((e) => e === "area_plot_sotka_min") ||
            !!errors?.find((e) => e === "area_plot_sotka_max")
          }
        />
      </>
    )}
    {/* <Ranger
        label="Площа території"
        max={110}
        defaultStart={25}
        defaultEnd={45}
        mainType={
          <>
            m<sup>2</sup>
          </>
        }
      />
      <Divider /> */}
    {/* <SelectTags label="Тип угоди" />
      <ToggleOption label="Все крім цього" className="toggle-opt" /> */}
    {fields &&
      handleGetFieldsOptions(fields, "type_obj_garage")?.length > 0 && (
        <>
          <Divider />
          <SelectTags
            label="Тип гаража"
            placeholder="Оберіть тип гаража"
            notMultiSelect
            options={handleGetFieldsOptions(fields, "type_obj_garage")}
            value={data?.type_obj_garage}
            onChange={(val) => onChangeField("type_obj_garage", val)}
            error={!!errors?.find((e) => e === "type_obj_garage")}
          />
        </>
      )}
    {fields &&
      handleGetFieldsOptions(fields, "type_obj_apartment")?.length > 0 && (
        <>
          <Divider />
          <SelectTags
            label="Тип багатоповерхівки"
            placeholder="Оберіть тип багатоповерхівки"
            notMultiSelect
            options={handleGetFieldsOptions(fields, "type_obj_apartment")}
            value={data?.type_obj_apartment}
            onChange={(val) => onChangeField("type_obj_apartment", val)}
            error={!!errors?.find((e) => e === "type_obj_apartment")}
          />
        </>
      )}
    {fields &&
      handleGetFieldsOptions(fields, "type_obj_commerce")?.length > 0 && (
        <>
          <Divider />
          <SelectTags
            label="Тип комерції"
            placeholder="Оберіть тип комерції"
            notMultiSelect
            options={handleGetFieldsOptions(fields, "type_obj_commerce")}
            value={data?.type_obj_commerce}
            onChange={(val) => onChangeField("type_obj_commerce", val)}
            error={!!errors?.find((e) => e === "type_obj_commerce")}
          />
        </>
      )}
    {fields && handleGetFieldsOptions(fields, "type_obj_house")?.length > 0 && (
      <>
        <Divider />
        <SelectTags
          label="Тип будинку"
          placeholder="Оберіть тип будинку"
          notMultiSelect
          options={handleGetFieldsOptions(fields, "type_obj_house")}
          value={data?.type_obj_house}
          onChange={(val) => onChangeField("type_obj_house", val)}
          error={!!errors?.find((e) => e === "type_obj_house")}
        />
      </>
    )}
    {fields && handleGetFieldsOptions(fields, "type_obj_hotel")?.length > 0 && (
      <>
        <Divider />
        <SelectTags
          label="Тип готелю"
          placeholder="Оберіть тип готелю"
          notMultiSelect
          options={handleGetFieldsOptions(fields, "type_obj_hotel")}
          value={data?.type_obj_hotel}
          onChange={(val) => onChangeField("type_obj_hotel", val)}
          error={!!errors?.find((e) => e === "type_obj_hotel")}
        />
      </>
    )}
  </StyledCard>
);

const StyledCard = styled.div`
  margin-bottom: 20px;
`;
