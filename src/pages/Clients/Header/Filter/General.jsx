import { styled } from "styled-components";
import { Select } from "../../../../components/Select/Select";
import { Divider } from "./Divider";
import { ReactComponent as LocationIcon } from "../../../../assets/images/location-color.svg";
import { Ranger } from "./Ranger/Ranger";
import { ProfileField } from "../../../../components/ProfileField";
import { useGetPhonesCodesQuery } from "../../../../store/auth/auth.api";
import { ToggleOption } from "./ToggleOption";

export const General = ({
  filter,
  onChangeFilter,
  searchPhoneCode,
  onChangeSearchCode,
  searchPhoneCodeSecond,
  onChangeSearchCodeSecond,
}) => {
  const { data: phonesCodes } = useGetPhonesCodesQuery();

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
      />
      <Divider />
      <ProfileField
        label="Пошук по номеру часткове співпадіння"
        placeholder="Введіть значення..."
        value={filter?.filters?.findPhone}
        onChange={(val) =>
          onChangeFilter("filters", { ...filter.filters, findPhone: val })
        }
      />
      <Divider />
      <div className="flex items-center">
        <ProfileField
          label="Дата реєстрації від"
          type="date"
          value={filter?.filters?.dt_reg_from}
          onChange={(val) =>
            onChangeFilter("filters", { ...filter.filters, dt_reg_from: val })
          }
          onlyCalendar
        />
        <ProfileField
          label="Дата реєстрації до"
          type="date"
          value={filter?.filters?.dt_reg_to}
          onChange={(val) =>
            onChangeFilter("filters", { ...filter.filters, dt_reg_to: val })
          }
          onlyCalendar
        />
      </div>
      <Divider />
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
      {/* <Divider />
      <ToggleOption
        label="Клієнти до видалення"
        value={filter?.XXXX === "1"}
        onChange={() =>
          onChangeFilter("XXXX", filter?.XXXX === "1" ? "0" : "1")
        }
      /> */}
      {/* <Divider />
      <ToggleOption
        label="Клієнти моєї структури"
        value={filter?.XXXX === "1"}
        onChange={() =>
          onChangeFilter("XXXX", filter?.XXXX === "1" ? "0" : "1")
        }
      /> */}
      <Divider />
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
      {/* <Divider />
      <ToggleOption
        label="Тільки делеговані клієнти"
        value={filter?.XXXX === "1"}
        onChange={() =>
          onChangeFilter("XXXX", filter?.XXXX === "1" ? "0" : "1")
        }
      /> */}

      {/* <Select
        label="Категорія"
        labelActive="Оберіть категорію"
        value="Оренда квартир"
      />
      <Divider />
      <Select
        label="Локація"
        labelActive="Локація"
        value="Оберіть локацію"
        Icon={LocationIcon}
      />
      <Divider />
      <Ranger
        label="Ціна"
        types={["$", "₴"]}
        max={50000}
        defaultStart={9000}
        defaultEnd={22000}
      />
      <Divider />
      <Select
        label="Кількість кімнат"
        labelActive="Оберіть кількість кімнат"
        value="2, 3, 4 – кімнатна"
      /> */}
    </StyledGeneral>
  );
};

const StyledGeneral = styled.div`
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.1);
  padding: 6px;
  margin-bottom: 25px;
`;
