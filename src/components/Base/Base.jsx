import { styled } from "styled-components";
import { TitleDivider } from "./TitleDivider";
import { CheckOption } from "../CheckOption";
import { useGetCommentsToFieldsQuery } from "../../store/objects/objects.api";
import { useState } from "react";
import { Select } from "../Select/Select";
import { Period } from "./Period/Period";
import { Divider } from "./Divider";
import { ToggleOption } from "../ToggleOption";
import {
  useGetCompaniesQuery,
  useGetSortingObjectQuery,
} from "../../store/requests/requests.api";
import { SelectTags } from "../SelectTags/SelectTags";

export const Base = ({ data, onChange, className }) => {
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const { data: companies } = useGetCompaniesQuery();
  const { data: sortingPeriods } = useGetSortingObjectQuery();
  const [company, setCompany] = useState(true);
  const [streetBase, setStreetBase] = useState(!!data.street_base_object);
  const [mlsBase, setMlsBase] = useState(!!data.mls_object);

  const handleGetFormatCompanies = () =>
    companies?.data
      ? Object.entries(companies?.data)?.map((c) => ({
          title: c[1],
          value: c[0],
        }))
      : [];

  const handleToggleCompany = () => {
    if (company) {
      onChange("reset", { ...data, company_object: undefined }, true);
    }

    setCompany(!company);
  };

  const handleToggleStreetBase = () => {
    if (streetBase) {
      onChange("reset", { ...data, street_base_object: undefined }, true);
    }

    setStreetBase(!streetBase);
  };

  const handleToggleMlsBase = () => {
    if (mlsBase) {
      onChange("reset", { ...data, mls_object: undefined }, true);
    }

    setMlsBase(!mlsBase);
  };

  return (
    <StyledBase className={`request-card ${className}`}>
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
              })
            }
          />
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
          />
          <CheckOption
            label="Тільки мої об'єкти"
            className="check-opt"
            value={data?.company_object?.show_only === "only_my" ? "1" : "0"}
            onChange={() =>
              onChange("company_object", {
                ...data?.company_object,
                show_only: "only_my",
              })
            }
          />
          <Divider />
          <CheckOption
            label="Aктуальні"
            className="check-opt"
            value={data?.company_object?.actual}
            onChange={() =>
              onChange("company_object", {
                ...data?.company_object,
                actual: data?.company_object?.actual === "1" ? undefined : "1",
              })
            }
          />
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
          />
          {/* <CheckOption
            label="Неактуальні"
            className="check-opt"
            value={data?.company_object?.show_street_base_company === "1"}
            onChange={() =>
              onChange("company_object", {
                ...data?.company_object,
                show_only:
                  data?.company_object?.show_street_base_company === "1"
                    ? undefined
                    : "1",
              })
            }
          /> */}
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
          />
          <CheckOption
            label={
              <>
                Об’єкти <span className="xbase-title">Street base</span>
              </>
            }
            className="check-opt"
            value={data?.company_object?.show_street_base_company}
            onChange={() =>
              onChange("company_object", {
                ...data?.company_object,
                show_street_base_company:
                  data?.company_object?.show_street_base_company === "1"
                    ? undefined
                    : "1",
              })
            }
          />
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
              data?.mls_object?.list_company?.find((c) => c === v.value)
            )}
            onChange={(val) =>
              onChange("mls_object", {
                ...data?.mls_object,
                list_company: !!data?.mls_object?.list_company?.find(
                  (c) => c === val
                )
                  ? data?.mls_object?.list_company?.filter((c) => c !== val)
                  : [
                      ...(Array.isArray(data?.mls_object?.list_company)
                        ? data?.mls_object?.list_company
                        : []),
                      val,
                    ],
              })
            }
            options={handleGetFormatCompanies()}
            showTags
            className="companySelect"
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
