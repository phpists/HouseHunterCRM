import { styled } from "styled-components";

export const Description = ({ description, className }) => (
  <StyledDescription className={`${className}`}>
    {description}
  </StyledDescription>
);

const StyledDescription = styled.div`
  color: var(--main-color);
  text-align: center;
  font-family: Open Sans;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.3px;
  opacity: 0.4;
`;
