import { styled } from "styled-components";
import { TitleDivider } from "./TitleDivider";
import { CheckOption } from "../CheckOption";
import {
  useGetCommentsToFieldsQuery,
  useGetSourcesQuery,
  useGetTagsListQuery,
} from "../../store/objects/objects.api";
import { useEffect, useState } from "react";
import { Period } from "./Period/Period";
import { Divider } from "./Divider";
import { ToggleOption } from "../ToggleOption";
import {
  useGetCompaniesQuery,
  useGetSortingObjectQuery,
} from "../../store/requests/requests.api";
import { SelectTags } from "../SelectTags/SelectTags";
import { Field } from "../Field";
import { ProfileField } from "../ProfileField";
import { useGetWorkerMyStructureQuery } from "../../store/calls/calls.api";
import { useAppSelect } from "../../hooks/redux";
import { useGetCompanyStructureLevelQuery } from "../../store/structure/structure.api";
import { Ranger } from "../Ranger/Ranger";
import { handleChangeRange } from "../../utilits";
import {
  useGetCompanyInfoQuery,
  useGetWorkersMyCompanyQuery,
} from "../../store/billing/billing.api";
import { XHOUSE_COMPANY_ID } from "../../constants";

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
  onFocus,
  onBlur,
  objMls,
  countObjectOwner,
  requestPage,
  allObjectsWorker,
  publicAccess,
  onlyNotmyClient,
  notCommentAndTags,
  showTagsObjarray,
  hideAdvertsAdd,
  hidePicaroon,
  requestHidePicaroon,
  liquidity,
  hideActual,
  overbuyingIndex,
  countViews,
  countLikes,
}) => {
  const { user } = useAppSelect((state) => state.auth);
  const { data: level } = useGetCompanyStructureLevelQuery();
  const { data: companies } = useGetCompaniesQuery();
  const { data: sortingPeriods } = useGetSortingObjectQuery();
  const { data: companyWorkers } = useGetWorkersMyCompanyQuery();
  const [company, setCompany] = useState(!!data?.company_object);
  const [streetBase, setStreetBase] = useState(
    !!data.street_base_object || streetBaseOpen
  );
  const [mlsBase, setMlsBase] = useState(!!data.mls_object || mlsBaseOpen);
  const { data: workers } = useGetWorkerMyStructureQuery();
  const { data: sources } = useGetSourcesQuery();
  const { data: tagsList } = useGetTagsListQuery({ only_notepad: "0" });
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const { data: companyInfo } = useGetCompanyInfoQuery();
  const iS_AD_ACCESS =
    XHOUSE_COMPANY_ID.includes(companyInfo?.data?.id_hash) ||
    XHOUSE_COMPANY_ID.includes(user?.id);

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

  const handleChangeCompany = (val) => {
    const newValue = !!data?.mls_object?.[companiesFieldName]?.find(
      (c) => c === val
    )
      ? data?.mls_object?.[companiesFieldName]?.filter((c) => c !== val)
      : [
          ...(Array.isArray(data?.mls_object?.[companiesFieldName])
            ? data?.mls_object?.[companiesFieldName]
            : []),
          val,
        ];

    const isValues = newValue?.length > 0 || data?.mls_object?.invert_company;

    onChange(
      "mls_object",
      !isValues
        ? {}
        : {
            ...data?.mls_object,
            [companiesFieldName]: newValue,
          }
    );
  };

  const handleChangeInvertCompany = () => {
    const newValue = data?.mls_object?.invert_company === "1" ? undefined : "1";
    const isValues =
      data?.mls_object?.[companiesFieldName]?.length > 0 || newValue;

    onChange(
      "mls_object",
      !isValues
        ? {}
        : {
            ...data?.mls_object,
            invert_company: newValue,
          }
    );
  };

  const handleChangeShowTagsObjarray = (val) => {
    const prevValue = Array.isArray(data?.street_base_object?.showTagsObj)
      ? data?.street_base_object?.showTagsObj
      : [];

    onChange("street_base_object", {
      ...data?.street_base_object,
      showTagsObj: prevValue?.find((t) => t === val?.toString())
        ? prevValue?.filter((t) => t?.toString() !== val?.toString())
        : [...prevValue, val?.toString()],
    });
  };

  const handleChangeExcludeResourceAdd = (val) => {
    const prevValue = Array.isArray(data?.company_object?.excludeResourceAdd)
      ? data?.company_object?.excludeResourceAdd
      : [];
    const isExist = prevValue?.find((l) => l === val);

    onChange("company_object", {
      ...data?.company_object,
      excludeResourceAdd: isExist
        ? prevValue?.filter((l) => l !== val)
        : [...prevValue, val],
    });
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
            label="Всі автомобілі"
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
          {allObjectsWorker && data?.company_object?.show_only === "company" ? (
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
          ) : null}
          {Number(user?.struct_level) !== Number(level) ? (
            <>
              {" "}
              <CheckOption
                label="Автомобілі моєї структури"
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
            label="Тільки мої автомобілі"
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

          {publicAccess ? (
            <CheckOption
              label="Спільний доступ"
              className="check-opt"
              value={
                data?.company_object?.show_only === "public_access" ? "1" : "0"
              }
              onChange={() =>
                onChange("company_object", {
                  ...data?.company_object,
                  show_only: "public_access",
                  id_worker_Search: undefined,
                })
              }
              error={!!errors.find((e) => e === "show_only")}
            />
          ) : null}
          <Divider />

          <CheckOption
            label={
              <>
                Автомобілі <span className="xbase-title">Street base</span>
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
          {objMls ? (
            <CheckOption
              label="Автомобілі MLS"
              className="check-opt"
              value={data?.company_object?.obj_mls}
              onChange={() =>
                onChange("company_object", {
                  ...data?.company_object,
                  obj_mls:
                    data?.company_object?.obj_mls === "1" ? undefined : "1",
                })
              }
              error={!!errors.find((e) => e === "company_object_more")}
            />
          ) : null}
          {showDeleted ? (
            <CheckOption
              label="Автомобілі до видалення"
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
              label="Пошук по Id на ресурсі"
              className="field-wrapper"
              onFocus={onFocus}
              onBlur={onBlur}
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
          {requestHidePicaroon ? (
            <CheckOption
              label="Приховати шахраїв"
              className="check-opt"
              value={data?.hide_picaroon}
              onChange={() =>
                onChange(
                  "hide_picaroon",
                  data?.hide_picaroon === "1" ? undefined : "1"
                )
              }
            />
          ) : null}
          {hidePicaroon ? (
            <CheckOption
              label="Приховати шахраїв"
              className="check-opt"
              value={data?.street_base_object?.hide_picaroon}
              onChange={() =>
                onChange("street_base_object", {
                  ...data?.street_base_object,
                  hide_picaroon:
                    data?.street_base_object?.hide_picaroon === "1"
                      ? undefined
                      : "1",
                })
              }
            />
          ) : null}
          {requestPage ? null : (
            <CheckOption
              label="Потенційні власники"
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
          )}
          {onlyNotmyClient ? (
            <CheckOption
              label="Виключити клієнтів компанії"
              className="check-opt"
              value={data?.street_base_object?.onlyNotClientsCompany}
              onChange={() =>
                onChange("street_base_object", {
                  ...data?.street_base_object,
                  onlyNotClientsCompany:
                    data?.street_base_object?.onlyNotClientsCompany === "1"
                      ? undefined
                      : "1",
                })
              }
            />
          ) : null}
          {notCommentAndTags ? (
            <CheckOption
              label="Автомобілі без коментарів та тегів"
              className="check-opt"
              value={data?.street_base_object?.notCommentAndTags}
              onChange={() =>
                onChange("street_base_object", {
                  ...data?.street_base_object,
                  notCommentAndTags:
                    data?.street_base_object?.notCommentAndTags === "1"
                      ? undefined
                      : "1",
                })
              }
            />
          ) : null}
          {showTagsObjarray ? (
            <SelectTags
              label="Пошук по тегам"
              className="mb-2"
              placeholder="Оберіть"
              options={tagsList?.data
                ?.map((value, i) => ({
                  title: commentsToFields?.object[value] ?? "",
                  value: i,
                }))
                ?.filter((opt) => opt?.title?.length > 0)}
              tags={
                Array.isArray(data?.street_base_object?.showTagsObj)
                  ? data?.street_base_object?.showTagsObj?.map((t) => ({
                      title:
                        commentsToFields?.object[tagsList?.data?.[t]] ?? "-",
                      value: t?.toString(),
                    }))
                  : []
              }
              onChange={handleChangeShowTagsObjarray}
              showTags
            />
          ) : null}
          {countObjectOwner ? (
            <Ranger
              label="Кількість автомобілів за номером"
              className="mb-2"
              max={1000}
              values={[
                data?.street_base_object?.count_object_owner_from ?? 0,
                data?.street_base_object?.count_object_owner_to ?? 0,
              ]}
              onChange={(values) =>
                handleChangeRange(
                  values,
                  [
                    data?.street_base_object?.count_object_owner_from ?? 0,
                    data?.street_base_object?.count_object_owner_to ?? 0,
                  ],
                  ["count_object_owner_from", "count_object_owner_to"],
                  (values) =>
                    onChange("street_base_object", {
                      ...data?.street_base_object,
                      ...values,
                    }),
                  true
                )
              }
              onFocus={onFocus}
              onBlur={onBlur}
            />
          ) : null}

          {overbuyingIndex ? (
            <Field
              placeholder="Введіть значення..."
              value={data?.street_base_object?.index_overbuying}
              onChange={(val) =>
                onChange("street_base_object", {
                  ...data?.street_base_object,
                  index_overbuying: val,
                })
              }
              label="Індекс перекупа"
              className="field-wrapper mb-2"
              onFocus={onFocus}
              onBlur={onBlur}
              type="number"
            />
          ) : null}

          {countViews ? (
            <Ranger
              label="Кількість переглядів"
              className="mb-2"
              max={1000}
              values={[
                data?.street_base_object?.count_views_from ?? 0,
                data?.street_base_object?.count_views_to ?? 0,
              ]}
              onChange={(values) =>
                handleChangeRange(
                  values,
                  [
                    data?.street_base_object?.count_views_from ?? 0,
                    data?.street_base_object?.count_views_to ?? 0,
                  ],
                  ["count_views_from", "count_views_to"],
                  (values) =>
                    onChange("street_base_object", {
                      ...data?.street_base_object,
                      ...values,
                    }),
                  true
                )
              }
              onFocus={onFocus}
              onBlur={onBlur}
            />
          ) : null}

          {countLikes ? (
            <Ranger
              label="Кількість лайків"
              className="mb-2"
              max={1000}
              values={[
                data?.street_base_object?.count_likes_from ?? 0,
                data?.street_base_object?.count_likes_to ?? 0,
              ]}
              onChange={(values) =>
                handleChangeRange(
                  values,
                  [
                    data?.street_base_object?.count_likes_from ?? 0,
                    data?.street_base_object?.count_likes_to ?? 0,
                  ],
                  ["count_likes_from", "count_likes_to"],
                  (values) =>
                    onChange("street_base_object", {
                      ...data?.street_base_object,
                      ...values,
                    }),
                  true
                )
              }
              onFocus={onFocus}
              onBlur={onBlur}
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
            onChange={handleChangeCompany}
            options={handleGetFormatCompanies()}
            showTags
            className="companySelect"
            closeOnScroll
          />
          <ToggleOption
            label="Все крім цього"
            value={data?.mls_object?.invert_company}
            onChange={handleChangeInvertCompany}
          />
        </>
      ) : null}
    </StyledBase>
  );
};

const StyledBase = styled.div`
  padding: 6px 8px;
  border-radius: 14px;
  background: var(--bg-10);
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
    color: var(--green);
  }
  .companySelect {
    margin: 6.5px 0px;
  }
`;
