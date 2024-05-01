import styled from "styled-components";

export const Selected = ({ selectedCount }) => (
  <StyledSelected>Обрано {selectedCount ?? 0}</StyledSelected>
);

const StyledSelected = styled.div`
  color: var(--dark-90);
  font-family: Overpass;
  font-size: 18px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: normal;
  letter-spacing: 0.36px;
  margin-left: 10px;
`;
