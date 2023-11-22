import { styled } from "styled-components";

export const Tag = () => <StyledTag>Головне фото</StyledTag>;

const StyledTag = styled.div`
  color: #fff;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.22px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(44, 44, 44, 0.5);
  backdrop-filter: blur(5px);
  padding: 1px 6px 2px;
`;
