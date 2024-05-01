import { styled } from "styled-components";

export const Subtitle = ({ phone }) => (
  <StyledSubtitle>
    {phone}
    {/* • ID:1254 */}
  </StyledSubtitle>
);

const StyledSubtitle = styled.div`
  margin-top: 2px;
  color: var(--main-color);
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
`;
