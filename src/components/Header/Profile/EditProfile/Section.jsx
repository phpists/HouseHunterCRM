import { styled } from "styled-components";

export const Section = ({ children, className }) => (
  <StyledSection className={`${className}`}>{children}</StyledSection>
);

const StyledSection = styled.div`
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.2);
  padding: 6px;
  margin-bottom: 25px;
  width: 100%;
`;
