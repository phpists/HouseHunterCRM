import styled from "styled-components";

export const Title = ({ title, selectedCount }) => (
  <StyledTitle>
    {title}
    {selectedCount}
  </StyledTitle>
);

const StyledTitle = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-family: Overpass;
  font-size: 18px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  letter-spacing: 0.36px;
`;
