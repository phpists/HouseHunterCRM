import styled from "styled-components";
import { CheckOption } from "../../CheckOption";

export const Title = () => (
  <StyledTitle>
    <CheckOption onlyCheck small />
    <span>Дошки оголошень</span>
  </StyledTitle>
);

const StyledTitle = styled.div`
  display: grid;
  grid-template-columns: 17px 1fr;
  gap: 15px;
  align-items: center;
  font-size: 18px;
  line-height: 22.79px;
  letter-spacing: 0.02em;
  font-weight: var(--font-weight-200);
  color: var(--color-2);
  margin-bottom: 15px;
`;
