import { styled } from "styled-components";
import { TitleDivider } from "./TitleDivider";
import { CheckOption } from "../CheckOption";
import {
  useGetCommentsToFieldsQuery,
  useGetSourcesQuery,
} from "../../store/objects/objects.api";
import { useEffect, useState } from "react";
import { Select } from "../Select/Select";
import { Period } from "./Period/Period";
import { Divider } from "./Divider";
import { ToggleOption } from "../ToggleOption";
import {
  useGetCompaniesQuery,
  useGetSortingObjectQuery,
} from "../../store/requests/requests.api";
import { SelectTags } from "../SelectTags/SelectTags";
import { Field } from "../Field";
import { Deadline } from "../../pages/Request/Characteristic/Deadline";
import { ProfileField } from "../ProfileField";
import { useGetWorkerMyStructureQuery } from "../../store/calls/calls.api";
import { useAppSelect } from "../../hooks/redux";
import {
  useGetAllPerimissionsLevelsQuery,
  useGetCompanyStructureLevelQuery,
} from "../../store/structure/structure.api";

export const Base = ({
  data,
  onChange,
  className,
  actualFieldName = "actual",
  notActualFieldName = "not_actual",
  streetBaseFieldName = "show_street_base_company",
  companiesFieldName = "list_company",
  streetBaseOpen,
  mlsBaseOpen,
  onChangeDefaultFiltersOpened,
  companyOpen,
  errors = [],
  dateAgreement,
  dateAgreementFieldName = "dt_end_agreement_to",
  request,
  idAdInSource,
  showDeleted,
  workersSearch,
  potentialOwner,
  idSource,
}) => {
  const { user } = useAppSelect((state) => state.auth);
  const { data: level } = useGetCompanyStructureLevelQuery();
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const { data: companies } = useGetCompaniesQuery();
  const { data: sortingPeriods } = useGetSortingObjectQuery();
  const [company, setCompany] = useState(!!data?.company_object);
  const [streetBase, setStreetBase] = useState(
    !!data.street_base_object || streetBaseOpen
  );
  const [mlsBase, setMlsBase] = useState(!!data.mls_object || mlsBaseOpen);
  const { data: workers } = useGetWorkerMyStructureQuery();
  const { data: sources } = useGetSourcesQuery();

  useEffect(() => {
    setMlsBase(mlsBaseOpen);
    setStreetBase(streetBaseOpen);
    setCompany(companyOpen);
  }, [streetBaseOpen, mlsBaseOpen, companyOpen]);

  useEffect(() => {
    !companyOpen && setCompany(!!data?.company_object?.show_only);
  }, [data?.company_object?.show_only]);

  const handleGetFormatCompanies = () =>
    companies?.data
      ? Object.entries(companies?.data)?.map((c) => ({
          title: c[1],
          value: c[0],
        }))
      : [];

  const handleToggleCompany = () => {
    onChange(
      "reset",
      { ...data, company_object: company ? undefined : {} },
      true
    );

    setCompany(!company);
    if (onChangeDefaultFiltersOpened) {
      onChangeDefaultFiltersOpened("company", !company);
    }
  };

  const handleToggleStreetBase = () => {
    onChange(
      "reset",
      { ...data, street_base_object: streetBase ? undefined : {} },
      true
    );

    setStreetBase(!streetBase);
    if (onChangeDefaultFiltersOpened) {
      onChangeDefaultFiltersOpened("street_base_object", !streetBase);
    }
  };

  const handleToggleMlsBase = () => {
    onChange("reset", { ...data, mls_object: mlsBase ? undefined : {} }, true);

    setMlsBase(!mlsBase);
    if (onChangeDefaultFiltersOpened) {
      onChangeDefaultFiltersOpened("mls_object", !mlsBase);
    }
  };

  return (
    <StyledBase
      className={`request-card ${className} ${
        !!errors?.find((e) => e === "base") && "error-field"
      }`}
    >
      <TitleDivider title="Company" />
      <ToggleOption
        label="База Company"
        value={company}
        onChange={handleToggleCompany}
      />
      {company ? (
        <>
          <CheckOption
            label="Всі об'єкти"
            className="check-opt"
            value={data?.company_object?.show_only === "company" ? "1" : "0"}
            onChange={() =>
              onChange("company_object", {
                ...data?.company_object,
                show_only: "company",
                id_worker_Search: undefined,
              })
            }
            error={!!errors.find((e) => e === "show_only")}
          />
          {Number(user?.struct_level) !== Number(level) ? (
            <>
              {" "}
              <CheckOption
                label="Об'єкти моєї структури"
                className="check-opt"
                value={
                  data?.company_object?.show_only === "my_structure" ? "1" : "0"
                }
                onChange={() =>
                  onChange("company_object", {
                    ...data?.company_object,
                    show_only: "my_structure",
                  })
                }
                error={!!errors.find((e) => e === "show_only")}
              />
              {data?.company_object?.show_only === "my_structure" &&
              workersSearch ? (
                <>
                  <SelectTags
                    label="Пошук по працівнику"
                    placeholder="Оберіть працівника"
                    options={
                      workers?.data
                        ? workers?.data?.map(
                            ({ id, first_name, last_name }) => ({
                              title: `${first_name} ${last_name}`,
                              value: id,
                            })
                          )
                        : []
                    }
                    value={data?.company_object?.id_worker_Search}
                    onChange={(val) =>
                      onChange("company_object", {
                        ...data?.company_object,
                        id_worker_Search:
                          val === data?.company_object?.id_worker_Search
                            ? undefined
                            : val,
                      })
                    }
                    isSearch
                    notMultiSelect
                  />
                  <Divider />
                </>
              ) : null}{" "}
            </>
          ) : null}
          <CheckOption
            label="Тільки мої об'єкти"
            className="check-opt"
            value={data?.company_object?.show_only === "only_my" ? "1" : "0"}
            onChange={() =>
              onChange("company_object", {
                ...data?.company_object,
                show_only: "only_my",
                id_worker_Search: undefined,
              })
            }
            error={!!errors.find((e) => e === "show_only")}
          />
          <Divider />
          <CheckOption
            label="Aктуальні"
            className="check-opt"
            value={data?.company_object?.[actualFieldName]}
            onChange={() =>
              onChange("company_object", {
                ...data?.company_object,
                [actualFieldName]:
                  data?.company_object[actualFieldName] === "1"
                    ? undefined
                    : "1",
              })
            }
            error={!!errors.find((e) => e === "company_object_more")}
          />
          {dateAgreement && (
            <>
              {request ? (
                <ProfileField
                  placeholder="Звільняється до"
                  label="Звільняється до"
                  value={data?.company_object?.[dateAgreementFieldName]}
                  onChange={(val) =>
                    onChange("company_object", {
                      ...data?.company_object,
                      [dateAgreementFieldName]: val,
                    })
                  }
                  type="date"
                  error={!!errors?.find((e) => e === dateAgreementFieldName)}
                  onlyCalendar
                  reset
                />
              ) : (
                <Field
                  placeholder="Звільняється до"
                  value={data?.company_object?.[dateAgreementFieldName]}
                  onChange={(val) =>
                    onChange("company_object", {
                      ...data?.company_object,
                      [dateAgreementFieldName]: val,
                    })
                  }
                  label="Звільняється до"
                  className="field-wrapper"
                  error={!!errors?.find((e) => e === dateAgreementFieldName)}
                  type="date"
                />
              )}
            </>
          )}
          <CheckOption
            label="Здані"
            className="check-opt"
            value={data?.company_object?.given_objects}
            onChange={() =>
              onChange("company_object", {
                ...data?.company_object,
                given_objects:
                  data?.company_object?.given_objects === "1" ? undefined : "1",
              })
            }
            error={!!errors.find((e) => e === "company_object_more")}
          />
          <CheckOption
            label="Неактуальні"
            className="check-opt"
            value={data?.company_object?.[notActualFieldName]}
            onChange={() =>
              onChange("company_object", {
                ...data?.company_object,
                [notActualFieldName]:
                  data?.company_object[notActualFieldName] === "1"
                    ? undefined
                    : "1",
              })
            }
            error={!!errors.find((e) => e === "company_object_more")}
          />
          <CheckOption
            label="Протерміновані"
            className="check-opt"
            value={data?.company_object?.overdue}
            onChange={() =>
              onChange("company_object", {
                ...data?.company_object,
                overdue:
                  data?.company_object?.overdue === "1" ? undefined : "1",
              })
            }
            error={!!errors.find((e) => e === "company_object_more")}
          />
          <CheckOption
            label={
              <>
                Об’єкти <span className="xbase-title">Street base</span>
              </>
            }
            className="check-opt"
            value={data?.company_object?.[streetBaseFieldName]}
            onChange={() =>
              onChange("company_object", {
                ...data?.company_object,
                [streetBaseFieldName]:
                  data?.company_object[streetBaseFieldName] === "1"
                    ? undefined
                    : "1",
              })
            }
            error={!!errors.find((e) => e === "company_object_more")}
          />
          {showDeleted ? (
            <CheckOption
              label="Об'єкти до видалення"
              className="check-opt"
              value={data?.company_object?.show_deleted}
              onChange={() =>
                onChange("company_object", {
                  ...data?.company_object,
                  show_deleted:
                    data?.company_object?.show_deleted === "1"
                      ? undefined
                      : "1",
                })
              }
              error={!!errors.find((e) => e === "company_object_more")}
            />
          ) : null}
        </>
      ) : null}
      <TitleDivider title="street base" />
      <ToggleOption
        label="База Street base"
        value={streetBase}
        onChange={handleToggleStreetBase}
      />
      {streetBase ? (
        <>
          <Period
            value={data?.street_base_object?.sorting_id}
            onChange={(val) =>
              onChange("street_base_object", {
                ...data?.street_base_object,
                sorting_id: val,
              })
            }
            options={
              sortingPeriods?.objects
                ? Object.entries(sortingPeriods?.objects)?.map((c) => ({
                    title: c[1],
                    value: c[0],
                  }))
                : []
            }
          />
          {idAdInSource ? (
            <Field
              placeholder="Введіть значення..."
              value={data?.street_base_object?.id_ad_in_source}
              onChange={(val) =>
                onChange("street_base_object", {
                  ...data?.street_base_object,
                  id_ad_in_source: val,
                })
              }
              label="Id на ресурсі"
              className="field-wrapper"
            />
          ) : null}
          <CheckOption
            label="Вимкнути «Без співпраці»"
            className="check-opt"
            value={data?.street_base_object?.disable_cooperation}
            onChange={() =>
              onChange("street_base_object", {
                ...data?.street_base_object,
                disable_cooperation:
                  data?.street_base_object?.disable_cooperation === "1"
                    ? undefined
                    : "1",
              })
            }
          />
          <CheckOption
            label="Потенцій власник"
            className="check-opt"
            value={data?.street_base_object?.potential_owner}
            onChange={() =>
              onChange("street_base_object", {
                ...data?.street_base_object,
                potential_owner:
                  data?.street_base_object?.potential_owner === "1"
                    ? undefined
                    : "1",
              })
            }
          />
          {idSource ? (
            <SelectTags
              label="Пошук по ресурсу"
              placeholder="Оберіть ресурс"
              options={
                typeof sources === "object"
                  ? Object?.entries(sources)?.map((e) => ({
                      value: e[0],
                      title: e[1],
                    }))
                  : []
              }
              value={data?.street_base_object?.id_source}
              onChange={(val) =>
                onChange("street_base_object", {
                  ...data?.street_base_object,
                  id_source:
                    val === data?.street_base_object?.id_source
                      ? undefined
                      : val,
                })
              }
              isSearch
              notMultiSelect
            />
          ) : null}
        </>
      ) : null}
      <TitleDivider title="mls base" />
      <ToggleOption
        label="База MLS"
        value={mlsBase}
        onChange={handleToggleMlsBase}
      />
      {mlsBase ? (
        <>
          <SelectTags
            label="Компанія"
            placeholder="Оберіть компанію"
            tags={handleGetFormatCompanies()?.filter((v) =>
              data?.mls_object?.[companiesFieldName]
                ? data?.mls_object?.[companiesFieldName]?.find(
                    (c) => c === v.value
                  )
                : false
            )}
            onChange={(val) =>
              onChange("mls_object", {
                ...data?.mls_object,
                [companiesFieldName]: !!data?.mls_object?.[
                  companiesFieldName
                ]?.find((c) => c === val)
                  ? data?.mls_object?.[companiesFieldName]?.filter(
                      (c) => c !== val
                    )
                  : [
                      ...(Array.isArray(data?.mls_object?.[companiesFieldName])
                        ? data?.mls_object?.[companiesFieldName]
                        : []),
                      val,
                    ],
              })
            }
            options={handleGetFormatCompanies()}
            showTags
            className="companySelect"
            closeOnScroll
          />
          <ToggleOption
            label="Все крім цього"
            value={data?.mls_object?.invert_company}
            onChange={() =>
              onChange("mls_object", {
                ...data?.mls_object,
                invert_company:
                  data?.mls_object?.invert_company === "1" ? undefined : "1",
              })
            }
          />
        </>
      ) : null}
    </StyledBase>
  );
};

const StyledBase = styled.div`
  padding: 6px 8px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  &.error-field {
    border: 1px red solid;
  }
  .check-opt {
    margin-bottom: 6.5px;
  }
  .check-opt-mls {
    margin: 6.5px 0;
  }
  .xbase-title {
    margin-left: 2px;
    color: #81fb21;
  }
  .companySelect {
    margin: 6.5px 0px;
  }
`;
