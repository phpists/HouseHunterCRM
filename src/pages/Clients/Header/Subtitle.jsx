import { styled } from "styled-components";

export const Subtitle = ({ subtitle }) => (
  <StyledSubtitle className="flex items-center">
    <span>•</span>
    {subtitle}
  </StyledSubtitle>
);

const StyledSubtitle = styled.div`
  color: var(--second-color);
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%;
  letter-spacing: 0.4px;
  span {
    color: var(--bg-20);
    margin: 0 5px;
  }
  @media (max-width: 850px) {
    display: none;
  }
`;
