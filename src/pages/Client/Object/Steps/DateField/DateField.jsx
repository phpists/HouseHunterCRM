import { styled } from "styled-components";
import { Field } from "./Field";
import { ReactComponent as CalendarIcon } from "../../../../../assets/images/calendar.svg";
import { ReactComponent as EditIcon } from "../../../../../assets/images/edit-calendar.svg";
import { useState } from "react";
import { Calendar } from "./Calendar/Calendar";
import { Hours } from "./Hours";

export const DateField = () => {
  const [active, setActive] = useState(null);

  const handleToggleActive = (value) =>
    setActive(active === value ? null : value);

  return (
    <StyledDateField>
      <div className="flex items-center fields">
        <Field
          value="04.09.2023"
          label="Дата"
          Icon={CalendarIcon}
          className="mr-3.5 date-field"
          onActive={() => handleToggleActive("date")}
          active={active === "date"}
        />
        <Field
          value="13:30"
          label="Час"
          Icon={EditIcon}
          onActive={() => handleToggleActive("time")}
          active={active === "time"}
        />
      </div>
      {active && (
        <div className="active-date-content">
          {active === "date" ? <Calendar /> : <Hours />}
        </div>
      )}
    </StyledDateField>
  );
};

const StyledDateField = styled.div`
  .fields {
    padding: 6px 10px;
    border-radius: 9px;
    transition: all 0.3s;
    .date-field {
      .field-content {
        margin-right: 32px;
      }
    }
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .active-date-content {
    margin-top: 6.5px;
  }
`;
