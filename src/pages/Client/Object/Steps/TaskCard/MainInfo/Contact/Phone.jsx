import { styled } from "styled-components";

export const Phone = () => <StyledPhone>+38 (097) 707-62-58</StyledPhone>;

const StyledPhone = styled.div`
  color: var(--main-color);
  text-align: right;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
`;
