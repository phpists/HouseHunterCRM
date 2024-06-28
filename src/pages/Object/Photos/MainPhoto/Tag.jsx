import { styled } from "styled-components";

export const Tag = ({ isCover, onMakeMain }) => (
  <StyledTag isCover={isCover} onClick={() => (isCover ? null : onMakeMain())}>
    {isCover ? "Головне фото" : "Зробити головним"}
  </StyledTag>
);

const StyledTag = styled.div`
  color: var(--main-color);
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.22px;
  border-radius: 5px;
  border: 1px solid var(--bg-15);
  background: var(--bg-5);
  backdrop-filter: blur(5px);
  padding: 1px 6px 2px;
  ${({ isCover }) => !isCover && "cursor: pointer;"}
`;
