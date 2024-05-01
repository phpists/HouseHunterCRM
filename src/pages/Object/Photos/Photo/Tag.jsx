import { styled } from "styled-components";

export const Tag = ({ onClick }) => (
  <StyledTag onClick={onClick}>Зробити Головним</StyledTag>
);

const StyledTag = styled.div`
  color: var(--main-color);
  font-family: Open Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.22px;
  border-radius: 5px;
  border: 1px solid var(--bg-15);
  background: var(--bg-5);
  backdrop-filter: blur(5px);
  padding: 5px 6px;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background: var(--modals-bg);
    @supports (-webkit-touch-callout: none) {
      background: var(--main-bg);
    }
  }
`;
