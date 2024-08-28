import styled from "styled-components";

export const Title = ({ type }) => (
  <StyledTitle className="clickable">{type ? "Тип" : "Статус"}</StyledTitle>
);

const StyledTitle = styled.div`
  color: var(--main-color);
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
`;
