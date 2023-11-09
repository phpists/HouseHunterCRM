import { styled } from "styled-components";
import { Select } from "../../../../components/Select/Select";
import { Divider } from "./Divider";
import { ReactComponent as LocationIcon } from "../../../../assets/images/location-color.svg";
import { Ranger } from "./Ranger/Ranger";
import { ProfileField } from "../../../../components/ProfileField";
import { useGetPhonesCodesQuery } from "../../../../store/auth/auth.api";

export const General = ({
  filter,
  onChangeFilter,
  searchPhoneCode,
  onChangeSearchCode,
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
