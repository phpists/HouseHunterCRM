import { styled } from "styled-components";

import { ProfileField } from "../../../../components/ProfileField";

export const General = ({
  filter,
  onChangeFilter,

  onToggleInputFocused,
}) => {
  return (
    <StyledGeneral>
      <ProfileField
        label="Пошук"
        placeholder="Введіть значення..."
        value={filter.search_key}
        onChange={(val) => onChangeFilter("search_key", val)}
        onFocus={() => onToggleInputFocused(true)}
        onBlur={() => onToggleInputFocused(false)}
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
