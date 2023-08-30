import { styled } from "styled-components";

export const Description = () => (
  <StyledDescription className="flex items-center">
    1 <span>к.,</span> 5<span>/</span>7 <span>пов.,</span> 92{" "}
    <span>
      м<sup>2</sup>
    </span>
  </StyledDescription>
);

const StyledDescription = styled.div`
  margin-top: -2px;
  color: rgba(255, 255, 255, 0.7);
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.22px;
  span {
    color: rgba(255, 255, 255, 0.4);
  }
`;
