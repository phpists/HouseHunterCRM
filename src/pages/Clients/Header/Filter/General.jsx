import { styled } from "styled-components";
import { Select } from "../../../../components/Select/Select";
import { Divider } from "./Divider";
import { ReactComponent as LocationIcon } from "../../../../assets/images/location-color.svg";
import { Ranger } from "./Ranger/Ranger";
import { ProfileField } from "../../../../components/ProfileField";
import { useGetPhonesCodesQuery } from "../../../../store/auth/auth.api";
import { ToggleOption } from "./ToggleOption";
import { Field } from "../../../../components/Field";
import { useAppSelect } from "../../../../hooks/redux";
import { useGetCompanyStructureLevelQuery } from "../../../../store/structure/structure.api";

export const General = ({
  filter,
  onChangeFilter,
  searchPhoneCode,
  onChangeSearchCode,
  searchPhoneCodeSecond,
  onChangeSearchCodeSecond,
  errors,
}) => {
  const { data: phonesCodes } = useGetPhonesCodesQuery();
  const { user } = useAppSelect((state) => state.auth);
  const { data: level } = useGetCompanyStructureLevelQuery();

  return (
    <StyledGeneral>
      <ProfileField
        label="Пошук"
        placeholder="Введіть значення..."
        value={filter.search_key}
        onChange={(val) => onChangeFilter("search_key", val)}
      />
      <Divider />
      <ProfileField
        label="Пошук по телефону"
        placeholder="Введіть значення..."
        value={filter.search_phone}
        onChange={(val) => onChangeFilter("search_phone", val)}
        phone
        phonesCodes={phonesCodes}
        phoneCode={searchPhoneCode}
        onChangePhoneCode={(val) => onChangeSearchCode(val)}
        error={errors?.search_phone}
      />
      <Divider />
      <ProfileField
        label="Пошук по номеру часткове співпадіння"
        placeholder="Введіть значення..."
        value={filter?.filters?.findPhone}
        onChange={(val) =>
          onChangeFilter("filters", { ...filter.filters, findPhone: val })
        }
        type="number"
      />
      <Divider />
      <div className="dates-wrapper">
        <Field
          label="Дата реєстрації від"
          type="date"
          value={filter?.filters?.dt_reg_from}
          onChange={(val) =>
            onChangeFilter("filters", { ...filter.filters, dt_reg_from: val })
          }
        />
        <Field
          label="Дата реєстрації до"
          type="date"
          value={filter?.filters?.dt_reg_to}
          onChange={(val) =>
            onChangeFilter("filters", { ...filter.filters, dt_reg_to: val })
          }
        />
      </div>
      <Divider />
      {Number(user?.struct_level) !== Number(level) ? (
        <>
          <ToggleOption
            label="Моя структура"
            value={filter?.my_struct === "1"}
            onChange={() =>
              onChangeFilter(
                "my_struct",
                filter?.my_struct === "1" ? undefined : "1"
              )
            }
          />
          <Divider />
        </>
      ) : null}
      <ToggleOption
        label="Клієнти без об'єктів та запитів"
        value={filter?.filters?.clientNotItem === "1"}
        onChange={() =>
          onChangeFilter("filters", {
            ...filter.filters,
            clientNotItem:
              filter?.filters?.clientNotItem === "1" ? undefined : "1",
          })
        }
      />
      <Divider />
      <ToggleOption
        label="Клієнти з об'єктами"
        value={filter?.filters?.clietnHasObject === "1"}
        onChange={() =>
          onChangeFilter("filters", {
            ...filter.filters,
            clietnHasObject:
              filter?.filters?.clietnHasObject === "1" ? undefined : "1",
          })
        }
      />
      <Divider />
      <ToggleOption
        label="Клієнти з запитами"
        value={filter?.filters?.clietnHasRequest === "1"}
        onChange={() =>
          onChangeFilter("filters", {
            ...filter.filters,
            clietnHasRequest:
              filter?.filters?.clietnHasRequest === "1" ? undefined : "1",
          })
        }
      />
      <Divider />
      <ToggleOption
        label="Клієнти до видалення"
        value={filter?.filters?.show_deleted === "1"}
        onChange={() =>
          onChangeFilter("filters", {
            ...filter.filters,
            show_deleted:
              filter?.filters?.show_deleted === "1" ? undefined : "1",
          })
        }
      />
    </StyledGeneral>
  );
};

const StyledGeneral = styled.div`
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.1);
  padding: 6px;
  margin-bottom: 25px;
  .dates-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;
