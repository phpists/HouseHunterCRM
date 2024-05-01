import styled from "styled-components";

export const Title = ({ selectedCount }) => (
  <StyledTitle>Обрано {selectedCount}</StyledTitle>
);

const StyledTitle = styled.div`
  color: var(--dark-90);
  font-family: Overpass;
  font-size: 18px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  letter-spacing: 0.36px;
`;
