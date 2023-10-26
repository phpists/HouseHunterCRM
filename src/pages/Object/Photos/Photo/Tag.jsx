import { styled } from "styled-components";

export const Tag = ({ onClick }) => (
  <StyledTag onClick={onClick}>Зробити Головним</StyledTag>
);

const StyledTag = styled.div`
  color: #fff;
  font-family: Open Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.22px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(44, 44, 44, 0.5);
  backdrop-filter: blur(5px);
  padding: 5px 6px;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background: rgba(44, 44, 44, 0.8);
  }
`;
