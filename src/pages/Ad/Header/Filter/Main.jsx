import styled from "styled-components";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";
import { Divider } from "./Divider";
import {
  useGetAdverstionResourceQuery,
  useGetStatusAccountQuery,
} from "../../../../store/objects/objects.api";
import { useGetWorkersMyCompanyQuery } from "../../../../store/billing/billing.api";
import {
  useGetRealestateStatusQuery,
  useGetStatusesOlxQuery,
} from "../../../../store/auth/auth.api";
import { useGetCompanyInfoQuery } from "../../../../store/billing/billing.api";
import { useAppSelect } from "../../../../hooks/redux";
import { XHOUSE_COMPANY_ID } from "../../../../constants";
import { CheckOption } from "../../../../components/CheckOption";

export const Main = ({ filters, onChangeFilter }) => {
  const { data: statuses } = useGetStatusesOlxQuery();
  const { data: adverstionResources } = useGetAdverstionResourceQuery();
  const { data: accounts } = useGetStatusAccountQuery();
  const { data: realestateAccounts } = useGetRealestateStatusQuery();
  const { data: companyInfo } = useGetCompanyInfoQuery();
  const { data: companyWorkers } = useGetWorkersMyCompanyQuery();
  const { user } = useAppSelect((state) => state.auth);
  const iS_AD_ACCESS =
    XHOUSE_COMPANY_ID.includes(companyInfo?.data?.id_hash) ||
    XHOUSE_COMPANY_ID.includes(user?.id);

  return (
    <StyledMain className="section filterFieldsWrapper">
      <SelectTags
        label="Ресурс"
        placeholder="Оберіть ресурс"
        options={
          adverstionResources?.resource
            ?.map((v) => ({
              title: v?.name,
              value: v?.id,
            }))
            ?.filter((r) => (iS_AD_ACCESS ? true : r?.value !== "3")) ?? []
        }
        value={filters?.resource}
        onChange={(val) =>
          onChangeFilter(
            "resource",
            { resource: filters?.resource === val ? undefined : val },
            true
          )
        }
        isSearch
        notMultiSelect
      />
      {filters?.resource === "1" ? (
        <>
          <Divider />
          <SelectTags
            label="Пошук по статусу"
            placeholder="Оберіть статус"
            options={
              statuses?.data
                ? Object.entries(statuses?.data)?.map((s) => ({
                    title: s[1],
                    value: s[0],
                  }))
                : []
            }
            value={filters?.status}
            onChange={(val) =>
              onChangeFilter(
                "status",
                val === filters?.status ? undefined : val
              )
            }
            isSearch
            notMultiSelect
          />
          <SelectTags
            label="Пошук по акаунту"
            placeholder="Оберіть акаунт"
            options={
              accounts?.accounts
                ? accounts?.accounts
                    ?.filter(
                      (a) =>
                        new Date().getTime() < Number(a?.TokenExpires) * 1000
                    )
                    ?.map((a) => ({
                      title: a?.data?.name ?? a?.data?.email ?? a?.data?.id,
                      value: a?.data?.id,
                    }))
                : []
            }
            value={filters?.id_user_olx}
            onChange={(val) =>
              onChangeFilter(
                "id_user_olx",
                val === filters?.id_user_olx ? undefined : val
              )
            }
            isSearch
            notMultiSelect
          />
        </>
      ) : filters?.resource === "4" ? (
        <>
          <Divider />
          <SelectTags
            label="Пошук по статусу"
            placeholder="Оберіть статус"
            options={[
              { title: "Не знайдено", value: "not_found" },
              { title: "Активний", value: "active" },
              { title: "Не активний", value: "inactive" },
            ]}
            value={filters?.status}
            onChange={(val) =>
              onChangeFilter(
                "status",
                val === filters?.status ? undefined : val
              )
            }
            isSearch
            notMultiSelect
          />
          <SelectTags
            label="Пошук по акаунту"
            placeholder="Оберіть акаунт"
            options={
              realestateAccounts?.data?.map(({ email, id_account }) => ({
                value: id_account,
                title: email,
              })) ?? []
            }
            value={filters?.id_realestate_account}
            onChange={(val) =>
              onChangeFilter(
                "id_realestate_account",
                val === filters?.id_realestate_account ? undefined : val
              )
            }
            isSearch
            notMultiSelect
          />
        </>
      ) : filters?.resource === "3" ? (
        <>
          <Divider />
          <SelectTags
            label="Пошук по статусу"
            placeholder="Оберіть статус"
            options={[
              { title: "В процесі", value: "processing" },
              { title: "Успіх", value: "active" },
              { title: "Помилка", value: "failed" },
              { title: "Не знайдено", value: "not_found" },
              { title: "Закрито", value: "closed" },
            ]}
            value={filters?.status}
            onChange={(val) =>
              onChangeFilter(
                "status",
                val === filters?.status ? undefined : val
              )
            }
            isSearch
            notMultiSelect
          />
        </>
      ) : null}
      <CheckOption
        label="Оголошення моєї структури"
        className="check-opt"
        value={filters?.filters?.adds_my_struct === "1" ? "1" : "0"}
        onChange={() =>
          onChangeFilter(
            "adds_my_struct",
            {
              ...filters,
              filters: {
                adds_my_struct:
                  filters?.filters?.adds_my_struct === "1" ? undefined : "1",
                id_worker_Search: undefined,
              },
            },
            true
          )
        }
      />
      {filters?.filters?.adds_my_struct === "1" ? (
        <SelectTags
          label="Пошук по працівнику"
          placeholder="Оберіть працівника"
          options={
            companyWorkers?.data
              ? companyWorkers?.data?.map(({ id, name }) => ({
                  title: name ?? "-",
                  value: id,
                }))
              : []
          }
          value={filters?.filters?.id_worker_Search}
          onChange={(val) =>
            onChangeFilter(
              "call_my_struct",
              {
                ...filters,
                filters: {
                  ...filters?.filters,
                  id_worker_Search:
                    val === filters?.filters?.id_worker_Search
                      ? undefined
                      : val,
                },
              },
              true
            )
          }
          isSearch
          notMultiSelect
        />
      ) : null}
    </StyledMain>
  );
};

const StyledMain = styled.div`
  .first-angle,
  .second-angle {
    &::after {
      background: var(--bg-78-heck) !important;
    }
  }

  .base-wrapper {
    background: none;
  }
  .fields-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .filter-range-wrapper {
    grid-column: 1/3;
  }
  .streetsWrapper-btns {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-left: 10px;
    .iconButton {
      width: 30px;
      height: 30px;
    }
  }
`;
