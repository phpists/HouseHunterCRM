import styled from "styled-components";
import { SelectTags } from "../../../../../components/SelectTags/SelectTags";
import { Divider } from "../Divider";
import { Field } from "../../../../../components/Field";
import { Avatar } from "./Avatar";
import { useGetCallsTypeQuery } from "../../../../../store/calls/calls.api";
import { ToggleOption } from "../ToggleOption";
import { Period } from "../Period/Period";
import { ProfileField } from "../../../../../components/ProfileField";
import { useGetPhonesCodesQuery } from "../../../../../store/auth/auth.api";

export const Search = ({ filters, onChangeFilter }) => {
  const { data: callsType } = useGetCallsTypeQuery();
  const { data: phonesCodes } = useGetPhonesCodesQuery();

  return (
    <StyledSearch>
      <Field
        label="По ключу"
        placeholder="Почніть писати"
        value={filters?.search_key}
        onChange={(val) => onChangeFilter("search_key", val)}
      />
      <Divider />
      <ProfileField
        label="Пошук по телефону"
        placeholder="Введіть значення..."
        value={filters.search_phone}
        // onChange={(val) => onChangeFilter("search_phone", val)}
        phone
        phonesCodes={phonesCodes}
        phoneCode={filters.search_phone_code ?? "1"}
        // onChangePhoneCode={(val) => onChangeFilter("search_phone_code ", val)}
        className="notAvaible"
        // error={errors?.search_phone}
      />
      <Divider />
      <ProfileField
        label="Пошук по номеру часткове співпадіння"
        placeholder="Введіть значення..."
        value={filters?.findPhone}
        // onChange={(val) => onChangeFilter("findPhone", val)}
        className="notAvaible"
      />
      <Divider />
      <Period filters={filters} onChangeFilter={onChangeFilter} />
      <Divider />
      <SelectTags
        label="Статус"
        notMultiSelect
        options={[
          { title: "Не опрацьовані", value: "0" },
          { title: "Опрацьовані", value: "1" },
        ]}
        onChange={(val) =>
          onChangeFilter("status", filters?.status === val ? undefined : val)
        }
        value={filters?.status}
      />
      <Divider />
      <SelectTags
        label="Пошук по потоку"
        tags={filters?.type_call?.map((t) => ({
          title: callsType
            ? Object.entries(callsType)?.find(
                (c) => c[1]?.id?.toString() === t
              )?.[1].name
            : "-",
          value: t?.toString(),
        }))}
        placeholder="Оберіть"
        onChange={(val, title) => {
          onChangeFilter(
            "type_call",
            filters?.type_call?.find((t) => t === val?.toString())
              ? filters?.type_call?.filter(
                  (t) => t?.toString() !== val?.toString()
                )
              : [...filters?.type_call, val?.toString()]
          );
        }}
        options={
          callsType
            ? Object.entries(callsType)
                ?.filter((t) => t[0] !== "error")
                ?.map((t) => ({
                  title: t[1]?.name,
                  value: t[1]?.id?.toString(),
                }))
            : []
        }
        showTags
        hideArrow
      />
      <Divider />
      <ToggleOption
        label="Усі дзвінки"
        value={filters?.allCalls?.length >= 0}
        // onChange={() =>
        //   onChangeFilter(
        //     "call_my_struct",
        //     filters?.call_my_struct?.length >= 0 ? undefined : "1"
        //   )
        // }
        className="notAvaible"
      />
      <Divider />
      <ToggleOption
        label="Дзвінки моєї структури"
        value={filters?.call_my_struct?.length >= 0}
        onChange={() =>
          onChangeFilter(
            "call_my_struct",
            filters?.call_my_struct?.length >= 0 ? undefined : "1"
          )
        }
      />
      <Divider />
      <ToggleOption
        label="Тільки мої дзвінки"
        value={filters?.allCalls?.length >= 0}
        // onChange={() =>
        //   onChangeFilter(
        //     "call_my_struct",
        //     filters?.call_my_struct?.length >= 0 ? undefined : "1"
        //   )
        // }
        className="notAvaible"
      />
      {/* <Divider /> */}
      {/* <ToggleOption
        label="Переглянуті"
        value={filters?.view === "1"}
        onChange={() =>
          onChangeFilter("view", filters?.view === "1" ? "0" : "1")
        }
      /> */}
      {/* <Divider />
      <SelectTags label="По номеру телефона" />
      <Divider />
      <SelectTags label="По агентах" Component={<Avatar />} search /> */}
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  .notAvaible {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
