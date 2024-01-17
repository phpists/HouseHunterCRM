import styled from "styled-components";
import { SelectTags } from "../../../../../components/SelectTags/SelectTags";
import { Divider } from "../Divider";
import { Field } from "../../../../../components/Field";
import { Avatar } from "./Avatar";
import { useGetCallsTypeQuery } from "../../../../../store/calls/calls.api";
import { ToggleOption } from "../ToggleOption";

export const Search = ({ filters, onChangeFilter }) => {
  const { data: callsType } = useGetCallsTypeQuery();

  return (
    <StyledSearch>
      <SelectTags
        label="По потоку"
        tags={filters?.type_call?.map((t) => ({
          title: callsType[t]?.name ?? "",
          value: t?.toString(),
        }))}
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
      />
      <Divider />
      <Field
        label="По ключу"
        placeholder="Почніть писати"
        value={filters?.search_key}
        onChange={(val) => onChangeFilter("search_key", val)}
      />
      <Divider />
      <ToggleOption
        label="Моя структура"
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
        label="Переглянуті"
        value={filters?.view === "1"}
        onChange={() =>
          onChangeFilter("view", filters?.view === "1" ? "0" : "1")
        }
      />
      {/* <Divider />
      <SelectTags label="По номеру телефона" />
      <Divider />
      <SelectTags label="По агентах" Component={<Avatar />} search /> */}
    </StyledSearch>
  );
};
const StyledSearch = styled.div`
  padding: 6px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
`;
