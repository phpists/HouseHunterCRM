import styled from "styled-components";
import { TypeCard } from "./TypeCard/TypeCard";

export const Dropdown = () => (
  <StyledDropdown>
    <TypeCard titles={["Керівник"]} type={1} />
    <TypeCard titles={["Керівник", "Агент"]} type={2} />
    <TypeCard titles={["Керівник", "Стуктурний Керівник", "Агент"]} type={3} />
    <TypeCard
      titles={[
        "Керівник",
        "Регіональний Керівник",
        "Стуктурний Керівник",
        "Агент",
      ]}
      type={4}
    />
  </StyledDropdown>
);

const StyledDropdown = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  left: 0;
  border-radius: 0px 0px 6px 6px;
  background: rgb(52 52 52);
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  gap: 10px;
  z-index: 100;
`;
