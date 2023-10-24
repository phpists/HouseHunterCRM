import { styled } from "styled-components";
import { TitleDivider } from "./TitleDivider";
import { Divider } from "../Divider";
import { CheckOption } from "../../../components/CheckOption";
import { ToggleOption } from "../ToggleOption";
import { Period } from "./Period/Period";
import { SelectTags } from "../../../components/SelectTags/SelectTags";

export const Base = ({ data, onChangeField }) => {
  return (
    <StyledBase className="request-card hide-scroll">
      <TitleDivider title="X company" />
      {/* <SelectTags label="Категорія" notMultiSelect /> */}
      {/* <Divider /> */}
      {/* <CheckOption
        label="Неактуальні об’єкти"
        className="check-opt"
        value={data?.not_actual}
        onChange={(val) => onChangeField("not_actual", val ? 1 : 0)}
      /> */}
      {/* <CheckOption label="Здані об’єкти" className="check-opt" /> */}
      <CheckOption
        label="Об’єкти до видалення"
        className="check-opt"
        value={data?.deleted}
        onChange={(val) => onChangeField("deleted", val ? 1 : 0)}
      />
      {/* <CheckOption label="Актуальні об’єкти" className="check-opt" />
      <CheckOption label="Відновлені об’єкти після видалення" /> */}
      <Divider />
      {/* <CheckOption
        label={
          <>
            Об’єкти <span className="xbase-title">xbase</span>
          </>
        }
        className="check-opt"
      />
      <CheckOption label="Клієнти передані" className="check-opt" /> */}
      <CheckOption
        label="Об’єкти протерміновані"
        className="check-opt"
        value={data?.dt_deadline}
        onChange={(val) => onChangeField("dt_deadline", val ? 1 : 0)}
      />
      {/* <CheckOption label="Об’єкти (ліквідність)" className="check-opt" />
      <TitleDivider title="street base" />
      <Period />
      <CheckOption label="Вимкнути «Без співпраці»" className="check-opt" />
      <TitleDivider title="mls base" />
      <SelectTags
        label="Компанія"
        placeholder="Оберіть компанію"
        notMultiSelect
      />
      <CheckOption label="Неактуальні об’єкти" className="check-opt-mls" />
      <ToggleOption label="Все крім цього" /> */}
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
`;
