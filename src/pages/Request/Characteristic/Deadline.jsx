import styled from "styled-components";
import { ProfileField } from "../../../components/ProfileField";

export const Deadline = ({ value, onChange, error }) => {
  return (
    <StyledDeadline>
      <ProfileField
        label="Дата дедлайну"
        placeholder="Введіть дату дедлайну"
        value={value}
        onChange={onChange}
        type="date"
        error={error}
        onlyCalendar
      />
    </StyledDeadline>
  );
};

const StyledDeadline = styled.div``;
