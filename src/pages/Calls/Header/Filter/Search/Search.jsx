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

export const Search = ({
  filters,
  onChangeFilter,
  filterPhoneCode,
  onChangeFilterPhoneCode,
  showTelegram,
  activeType,
  onChangeActiveType,
  ordersTypes,
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

  console.log(activeType);
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
      <Period filters={filters} onChangeFilter={onChangeFilter} />
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
      <TitleDivider title="Телефонія" />
      <ToggleOption
        label="База Телефонія"
        value={activeType === "phone"}
        onChange={() =>
          onChangeActiveType(activeType === "phone" ? undefined : "phone")
        }
      />
      {activeType === "phone" ? (
        <>
          <SelectTags
            label="Пошук по потоку"
            tags={[
              ...filters?.type_call?.map((t) => ({
                title: callsType
                  ? Object.entries(callsType)?.find(
                      (c) => c[1]?.id?.toString() === t
                    )?.[1].name
                  : "-",
                value: t?.toString(),
              })),
            ]}
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
          <Divider />
          <ToggleOption
            label="Відсутній в базі"
            value={filters?.missing_client}
            onChange={() =>
              onChangeFilter(
                "missing_client",
                filters?.missing_client ? undefined : "1"
              )
            }
          />
        </>
      ) : null}
      <TitleDivider title="Сайт" />
      <ToggleOption
        label="База Сайт"
        value={activeType === "site"}
        onChange={() =>
          onChangeActiveType(activeType === "site" ? undefined : "site")
        }
      />
      {activeType === "site" ? (
        <>
          <SelectTags
            label="Пошук по типу"
            tags={[
              ...filters?.type_call?.map((t) => ({
                title: ordersTypes
                  ? Object.entries(ordersTypes)?.find(
                      (c) => c[0]?.toString() === t
                    )?.[1]
                  : "-",
                value: t?.toString(),
              })),
            ]}
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
              ...(ordersTypes
                ? Object.entries(ordersTypes)
                    ?.filter((t) => t[0] !== "error")
                    ?.map((t) => ({
                      title: t[1],
                      value: t[0]?.toString(),
                    }))
                : []),
            ]}
            showTags
            hideArrow
          />
          <Divider />
          <ToggleOption
            label="Відсутній в базі"
            value={filters?.missing_client}
            onChange={() =>
              onChangeFilter(
                "missing_client",
                filters?.missing_client ? undefined : "1"
              )
            }
          />
        </>
      ) : null}
      <TitleDivider title="Телеграм" />
      <ToggleOption
        label="База Телеграм"
        value={activeType === "telegram"}
        onChange={() =>
          onChangeActiveType(activeType === "telegram" ? undefined : "telegram")
        }
      />
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  .notAvaible {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
