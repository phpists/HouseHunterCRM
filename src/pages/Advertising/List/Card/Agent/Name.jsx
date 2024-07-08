import styled from "styled-components";

export const Name = () => <StyledName>Юрій Мицавка</StyledName>;

const StyledName = styled.div`
  font-size: 15px;
  font-weight: var(--font-weight-light);
  line-height: 17.7px;
  letter-spacing: 0.02em;
  text-align: left;
  margin-bottom: 2px;
`;
