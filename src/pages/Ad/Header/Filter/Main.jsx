import styled from "styled-components";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";
import { Divider } from "./Divider";
import {
  useGetAdverstionResourceQuery,
  useGetStatusAccountQuery,
} from "../../../../store/objects/objects.api";

import { useGetStatusesOlxQuery } from "../../../../store/auth/auth.api";

export const Main = ({ filters, onChangeFilter }) => {
  const { data: statuses } = useGetStatusesOlxQuery();
  const { data: adverstionResources } = useGetAdverstionResourceQuery();
  const { data: accounts } = useGetStatusAccountQuery();

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
            val === filters?.resource ? undefined : val
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
