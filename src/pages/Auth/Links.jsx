import styled from "styled-components";

export const Links = () => (
  <StyledLinks>
    <a href="/#/info/terms" target="_blank">
      Угода користувача
    </a>
    <a href="/#/info/license" target="_blank">
      Ліцензійний договір
    </a>
    <a href="/#/info/privacy" target="_blank">
      Конфіденційність
    </a>
    <a href="/#/info/cookie-policy" target="_blank">
      Використання cookie
    </a>
  </StyledLinks>
);

const StyledLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  color: var(--main-color);
  text-align: center;
  font-family: Open Sans;
  font-size: 13px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.3px;
  text-align: center;
  width: 280px;
  margin-top: 20px;
  a {
    opacity: 0.4;
    transition: all 0.3s;
    &:hover {
      opacity: 1;
    }
  }
`;
