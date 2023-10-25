import { styled } from "styled-components";
import { Ranger } from "../../../components/Ranger/Ranger";
import { Divider } from "../Divider";
import { ToggleOption } from "../ToggleOption";
import { SelectTags } from "../../../components/SelectTags/SelectTags";
import { handleChangeRange, handleGetFieldsOptions } from "../../../utilits";

export const Characteristic = ({ data, onChangeField, fields }) => {
  return (
    <StyledCharacteristic className="request-card hide-scroll">
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
        />
      )}
      {fields && handleGetFieldsOptions(fields, "area_total_min") && (
        <>
          <Divider />
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
                [
                  data?.area_plot_sotka_min ?? 0,
                  data?.area_plot_sotka_max ?? 0,
                ],
                ["area_plot_sotka_min", "area_plot_sotka_max"],
                onChangeField
              )
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
            />
          </>
        )}

      {fields &&
        handleGetFieldsOptions(fields, "type_obj_house")?.length > 0 && (
          <>
            <Divider />
            <SelectTags
              label="Тип будинку"
              placeholder="Оберіть тип будинку"
              notMultiSelect
              options={handleGetFieldsOptions(fields, "type_obj_house")}
              value={data?.type_obj_house}
              onChange={(val) => onChangeField("type_obj_house", val)}
            />
          </>
        )}

      {fields &&
        handleGetFieldsOptions(fields, "type_obj_hotel")?.length > 0 && (
          <>
            <Divider />
            <SelectTags
              label="Тип готелю"
              placeholder="Оберіть тип готелю"
              notMultiSelect
              options={handleGetFieldsOptions(fields, "type_obj_hotel")}
              value={data?.type_obj_hotel}
              onChange={(val) => onChangeField("type_obj_hotel", val)}
            />
          </>
        )}

      {/* <ToggleOption label="Все крім цього" className="toggle-opt" /> */}
      {/* <Divider />
      <SelectTags label="Тип стін" />
      <ToggleOption label="Все крім цього" className="toggle-opt" />
      <Divider />
      <div className="opt-group">
        <ToggleOption label="Діти" className="toggle-opt" />
        <ToggleOption label="Тварини" className="toggle-opt" />
      </div> */}
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
