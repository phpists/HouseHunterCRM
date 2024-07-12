import styled from "styled-components";

export const Button = ({ title, href }) => (
  <StyledButton href={href} target="_blank">
    {title}
  </StyledButton>
);

const StyledButton = styled.a`
  padding: 8px 17px 6px;
  border-radius: 6px;
  background: var(--active-bg);
  height: 32px;
  color: #2c2c2c;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%;
  letter-spacing: 0.3px;
  transition: all 0.3s;
  opacity: 0.8;
  margin: 3px 0;
  display: block;
  width: max-content;
  &:hover {
    color: #2c2c2c;
    background: var(--active-bg);
    opacity: 1;
  }
`;
