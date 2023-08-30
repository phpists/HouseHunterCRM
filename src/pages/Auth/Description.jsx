import { styled } from "styled-components";

export const Description = ({ description, className }) => (
  <StyledDescription className={`${className}`}>
    {description}
  </StyledDescription>
);

const StyledDescription = styled.div`
  color: #fff;
  text-align: center;
  font-family: Open Sans;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.3px;
  opacity: 0.4;
`;
