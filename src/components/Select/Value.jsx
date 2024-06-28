import { styled } from "styled-components";

export const Value = ({ value, placeholder = "Оберіть" }) => (
  <StyledValue>{value?.length > 0 ? value : placeholder}</StyledValue>
);

const StyledValue = styled.div`
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  margin-bottom: 1px;
`;
