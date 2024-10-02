import styled from "styled-components";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";
import { Divider } from "./Divider";
import {
  useGetAdverstionResourceQuery,
  useGetStatusAccountQuery,
} from "../../../../store/objects/objects.api";

import {
  useGetRealestateStatusQuery,
  useGetStatusesOlxQuery,
} from "../../../../store/auth/auth.api";

export const Main = ({ filters, onChangeFilter }) => {
  const { data: statuses } = useGetStatusesOlxQuery();
  const { data: adverstionResources } = useGetAdverstionResourceQuery();
  const { data: accounts } = useGetStatusAccountQuery();
  const { data: realestateAccounts } = useGetRealestateStatusQuery();

  console.log(
    adverstionResources?.resource?.map((v) => ({
      title: v?.name,
      value: v?.id,
    }))
  );
  return (
    <StyledMain className="section filterFieldsWrapper">
      <SelectTags
        label="Ресурс"
        placeholder="Оберіть ресурс"
        options={
          adverstionResources?.resource?.map((v) => ({
            title: v?.name,
            value: v?.id,
          })) ?? []
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
                ? accounts?.accounts?.map((a) => ({
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
              { title: "Успішний", value: "succeeded" },
              { title: "Не успішний", value: "failed" },
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
