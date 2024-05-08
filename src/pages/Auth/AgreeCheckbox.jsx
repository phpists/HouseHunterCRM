import styled from "styled-components";

export const AgreeCheckbox = ({ value, onChange }) => {
  return (
    <StyledAgreeCheckbox onClick={onChange}>
      <input type="checkbox" checked={value} /> Я ознайомився і приймаю правила{" "}
      <br /> та умови користування
    </StyledAgreeCheckbox>
  );
};

const StyledAgreeCheckbox = styled.div`
  display: flex;
  align-items: start;
  gap: 5px;
  color: var(--main-color);
  text-align: center;
  font-family: Open Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.3px;
  margin-bottom: 20px;
  cursor: pointer;
  input {
    margin-top: 3px;
  }
`;
