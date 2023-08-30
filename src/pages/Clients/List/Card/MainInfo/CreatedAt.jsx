import { styled } from "styled-components";

export const CreatedAt = () => (
  <StyledCreatedAt>Створений 13.10.2022 13:19</StyledCreatedAt>
);

const StyledCreatedAt = styled.div`
  margin-top: 2px;
  color: #fff;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
`;
