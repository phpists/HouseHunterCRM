import styled from "styled-components";

export const Subtitle = ({ subtitle }) => (
  <StyledSubtitle>{subtitle} </StyledSubtitle>
);

const StyledSubtitle = styled.div`
  color: #fff;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
`;
