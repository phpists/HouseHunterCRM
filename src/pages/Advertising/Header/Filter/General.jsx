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
import { useGetWorkerMyStructureQuery } from "../../../../store/calls/calls.api";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";
import { useGetAdverstionResourceQuery } from "../../../../store/objects/objects.api";

export const General = ({
  filter,
  onChangeFilter,
  searchPhoneCode,
  onChangeSearchCode,
  searchPhoneCodeSecond,
  onChangeSearchCodeSecond,
  errors,
  onToggleInputFocused,
}) => {
  const { data: phonesCodes } = useGetPhonesCodesQuery();
  const { user } = useAppSelect((state) => state.auth);
  const { data: level } = useGetCompanyStructureLevelQuery();
  const { data: workers } = useGetWorkerMyStructureQuery();
  const { data: adverstionResources } = useGetAdverstionResourceQuery();

  return (
    <StyledGeneral>
      <SelectTags
        label="Ресурс"
        placeholder="Оберіть працівника"
        options={
          adverstionResources?.resource?.map((v) => ({
            title: v?.name,
            value: v?.id,
          })) ?? []
        }
        value={filter?.filters?.resource}
        onChange={(val) =>
          onChangeFilter("filters", {
            ...filter.filters,
            resource: val === filter?.filters?.resource ? undefined : val,
          })
        }
        isSearch
        notMultiSelect
      />
      <Divider />
      <ProfileField
        label="Пошук"
        placeholder="Введіть значення..."
        value={filter.search_key}
        onChange={(val) => onChangeFilter("search_key", val)}
        onFocus={() => onToggleInputFocused(true)}
        onBlur={() => onToggleInputFocused(false)}
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
        onFocus={() => onToggleInputFocused(true)}
        onBlur={() => onToggleInputFocused(false)}
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
        onFocus={() => onToggleInputFocused(true)}
        onBlur={() => onToggleInputFocused(false)}
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
          onFocus={() => onToggleInputFocused(true)}
          onBlur={() => onToggleInputFocused(false)}
        />
        <Field
          label="Дата реєстрації до"
          type="date"
          value={filter?.filters?.dt_reg_to}
          onChange={(val) =>
            onChangeFilter("filters", { ...filter.filters, dt_reg_to: val })
          }
          onFocus={() => onToggleInputFocused(true)}
          onBlur={() => onToggleInputFocused(false)}
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
          {filter?.my_struct === "1" ? (
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
              value={filter?.filters?.id_worker_Search}
              onChange={(val) =>
                onChangeFilter("filters", {
                  ...filter.filters,
                  id_worker_Search:
                    val === filter?.filters?.id_worker_Search ? undefined : val,
                })
              }
              isSearch
              notMultiSelect
            />
          ) : null}
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
            clietnHasObject: undefined,
            clietnHasRequest: undefined,
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
            clientNotItem: undefined,
            clietnHasRequest: undefined,
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
            clientNotItem: undefined,
            clietnHasObject: undefined,
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
  background: var(--bg-10);
  padding: 6px;
  margin-bottom: 25px;
  .dates-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;
