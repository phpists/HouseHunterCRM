import { styled } from "styled-components";
import { TitleDivider } from "./TitleDivider";
import { CheckOption } from "../../../components/CheckOption";
import { useGetCommentsToFieldsQuery } from "../../../store/objects/objects.api";
import { useState } from "react";
import { Select } from "../../../components/Select/Select";
import { ToggleOption } from "../../Objects/Header/Filter/ToggleOption";
import { Period } from "./Period/Period";
import { Divider } from "./Divider";

export const Base = ({ data, onChangeField, className }) => {
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const [company, setCompany] = useState(true);
  const [streetBase, setStreetBase] = useState(false);
  const [mlsBase, setMlsBase] = useState(false);

  return (
    <StyledBase className={`request-card ${className}`}>
      <TitleDivider title="Company" />
      <ToggleOption
        label="База Company"
        value={company}
        onChange={() => setCompany(!company)}
      />
      {company ? (
        <>
          <CheckOption label="Всі об'єкти" className="check-opt" />
          <CheckOption label="Об'єкти моєї структури" className="check-opt" />
          <CheckOption label="Тільки мої об'єкти" className="check-opt" />
          <Divider />
          <CheckOption label="Aктуальні" className="check-opt" />
          <CheckOption label="Здані" className="check-opt" />
          <CheckOption label="Неактуальні" className="check-opt" />
          <CheckOption label="Протерміновані" className="check-opt" />
          <CheckOption
            label={
              <>
                Об’єкти <span className="xbase-title">Street base</span>
              </>
            }
            className="check-opt"
          />
        </>
      ) : null}
      <TitleDivider title="street base" />
      <ToggleOption
        label="База Street base"
        value={streetBase}
        onChange={() => setStreetBase(!streetBase)}
      />
      {streetBase ? (
        <>
          <Period />
          <CheckOption label="Вимкнути «Без співпраці»" className="check-opt" />
        </>
      ) : null}
      <TitleDivider title="mls base" />
      <ToggleOption
        label="База MLS"
        value={mlsBase}
        onChange={() => setMlsBase(!mlsBase)}
      />
      {mlsBase ? (
        <>
          <Select
            label="Компанія"
            placeholder="Оберіть компанію"
            notMultiSelect
          />
          <ToggleOption label="Все крім цього" />
        </>
      ) : null}
    </StyledBase>
  );
};

const StyledBase = styled.div`
  padding: 6px 8px;
  border-radius: 14px;
  background: var(--bg-10);
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
`;
