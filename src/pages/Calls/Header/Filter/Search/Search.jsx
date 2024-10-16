import styled from "styled-components";
import { SelectTags } from "../../../../../components/SelectTags/SelectTags";
import { Divider } from "../Divider";
import { Field } from "../../../../../components/Field";
import { Avatar } from "./Avatar";
import {
  useGetCallsTypeQuery,
  useGetWorkerMyStructureQuery,
} from "../../../../../store/calls/calls.api";
import { ToggleOption } from "../ToggleOption";
import { Period } from "../Period/Period";
import { ProfileField } from "../../../../../components/ProfileField";
import { useGetPhonesCodesQuery } from "../../../../../store/auth/auth.api";
import { Select } from "../../../../../components/Select/Select";
import { useEffect } from "react";
import { useAppSelect } from "../../../../../hooks/redux";
import { useGetCompanyStructureLevelQuery } from "../../../../../store/structure/structure.api";
import { SectionTitle } from "../SectionTitle";
import { TitleDivider } from "../TitleDivider";
import { CheckOption } from "../../../../../components/CheckOption";

export const Search = ({
  filters,
  onChangeFilter,
  filterPhoneCode,
  onChangeFilterPhoneCode,
  showTelegram,
  activeType,
  onChangeActiveType,
  ordersTypes,
  telegramTypes,
  errors,
}) => {
  const { data: callsType } = useGetCallsTypeQuery();
  const { data: phonesCodes } = useGetPhonesCodesQuery();
  const { data: workers } = useGetWorkerMyStructureQuery();
  const { user } = useAppSelect((state) => state.auth);
  const { data: level } = useGetCompanyStructureLevelQuery();

  useEffect(() => {
    if (!filters?.call_my_struct) {
      onChangeFilter("id_worker_Search", undefined);
    }
  }, [filters?.call_my_struct]);

  return (
    <StyledSearch>
      <SelectTags
        label="Джерело"
        notMultiSelect
        placeholder="Оберіть"
        options={[
          { title: "Телефонія", value: "phone" },
          { title: "Сайт", value: "site" },
          { title: "Телеграм", value: "telegram" },
        ]}
        onChange={(val) => {
          onChangeActiveType(val === activeType ? undefined : val);
          onChangeFilter(
            "filters",
            {
              ...filters,
              type: undefined,
              type_call: [],
              status: "0",
            },
            true
          );
        }}
        value={activeType}
      />
      <Divider />
      {activeType === "phone" ? (
        <SelectTags
          label="Пошук по типу"
          tags={
            filters?.type_call?.map((t) => ({
              title: callsType
                ? Object.entries(callsType)?.find(
                    (c) => c[1]?.id?.toString() === t
                  )?.[1].name
                : "-",
              value: t?.toString(),
            })) ?? []
          }
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
          options={[
            ...(callsType
              ? Object.entries(callsType)
                  ?.filter((t) => t[0] !== "error")
                  ?.map((t) => ({
                    title: t[1]?.name,
                    value: t[1]?.id?.toString(),
                  }))
              : []),
          ]}
          showTags
          hideArrow
        />
      ) : activeType === "telegram" ? (
        <SelectTags
          label="Пошук по типу"
          notMultiSelect
          placeholder="Оберіть"
          options={[
            {
              value: "1",
              title: "Передзвоніть мені",
            },
            {
              value: "2",
              title: "Запис на показ обєкту",
            },
            {
              value: "3",
              title: "Додав обєкт",
            },
          ]}
          onChange={(val) =>
            onChangeFilter("type", filters?.type === val ? undefined : val)
          }
          value={filters?.type}
        />
      ) : activeType === "site" ? (
        <SelectTags
          label="Пошук по типу"
          notMultiSelect
          placeholder="Оберіть"
          options={[
            {
              title: "Запит на пошук",
              value: "1",
            },
            {
              title: "Консультація",
              value: "3",
            },
            {
              title: "Робота в xhouse",
              value: "2",
            },
          ]}
          onChange={(val) =>
            onChangeFilter("type", filters?.type === val ? undefined : val)
          }
          value={filters?.type}
        />
      ) : null}
      {activeType && activeType !== "empty" ? (
        <>
          <Divider />
          <SelectTags
            label="Статус"
            notMultiSelect
            options={[
              { title: "Не опрацьовані", value: "0" },
              { title: "Опрацьовані", value: "1" },
            ]}
            onChange={(val) =>
              onChangeFilter(
                "status",
                filters?.status === val ? undefined : val
              )
            }
            value={filters?.status}
          />
          <Divider />
        </>
      ) : null}
      {activeType === "phone" || activeType === "site" ? (
        <>
          <CheckOption
            label="Відсутній в базі"
            value={filters?.missing_client}
            onChange={() =>
              onChangeFilter(
                "missing_client",
                filters?.missing_client ? undefined : "1"
              )
            }
          />
          <Divider />
        </>
      ) : null}
      <Field
        label="По ключу"
        placeholder="Почніть писати"
        value={filters?.search_key}
        onChange={(val) => onChangeFilter("search_key", val)}
        error={errors?.includes("search_key")}
        errorMessage="Мінімум 4 символи"
      />
      <Divider />
      <ProfileField
        label="Пошук по телефону"
        placeholder="Введіть значення..."
        value={filters.search_phone}
        onChange={(val) => onChangeFilter("search_phone", val)}
        phone
        phonesCodes={phonesCodes}
        phoneCode={filterPhoneCode}
        onChangePhoneCode={(val) => onChangeFilterPhoneCode(val)}
        // error={errors?.search_phone}
      />
      <Divider />
      <ProfileField
        label="Пошук по номеру часткове співпадіння"
        placeholder="Введіть значення..."
        value={filters?.findPhone}
        onChange={(val) =>
          onChangeFilter("findPhone", val.replace(/[^0-9]/g, ""))
        }
      />
      <Divider />
      <Period filters={filters} onChangeFilter={onChangeFilter} top />
      {Number(user?.struct_level) !== Number(level) ? (
        <>
          <Divider />
          <ToggleOption
            label="Ліди моєї структури"
            value={filters?.call_my_struct?.length >= 0}
            onChange={() =>
              onChangeFilter(
                "call_my_struct",
                filters?.call_my_struct === "1" ? undefined : "1"
              )
            }
          />
          {filters?.call_my_struct?.length >= 0 ? (
            <>
              <SelectTags
                label="Пошук по працівнику"
                placeholder="Оберіть працівника"
                options={
                  workers?.data
                    ? workers?.data?.map(({ id, first_name, last_name }) => ({
                        title: `${first_name} ${last_name}`,
                        value: id,
                      }))
                    : []
                }
                value={filters?.id_worker_Search}
                onChange={(val) =>
                  onChangeFilter(
                    "id_worker_Search",
                    val === filters?.id_worker_Search ? undefined : val
                  )
                }
                isSearch
                notMultiSelect
              />
              <Divider />
            </>
          ) : null}
        </>
      ) : null}
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  .notAvaible {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
