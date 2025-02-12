import { styled } from "styled-components";

export const Title = ({ isLoaded, fileName }) => (
  <StyledTitle isLoaded={isLoaded}>{fileName}</StyledTitle>
);

const StyledTitle = styled.div`
  color: ${({ isLoaded }) => (isLoaded ? "#2FA112" : "#5d63ff")};
  text-align: center;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.22px;
  text-overflow: ellipsis;
  overflow: hidden;
  @media (max-width: 600px) {
    font-size: 8px;
  }
`;
