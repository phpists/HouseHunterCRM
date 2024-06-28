import { styled } from "styled-components";

export const LoadedMessage = () => (
  <StyledLoadedMessage>Файл успішно завантажено</StyledLoadedMessage>
);

const StyledLoadedMessage = styled.div`
  margin-top: 2px;
  color: var(--main-color);
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.22px;
  @media (max-width: 600px) {
    font-size: 8px;
  }
`;
