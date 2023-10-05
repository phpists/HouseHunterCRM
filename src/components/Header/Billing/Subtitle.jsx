import { styled } from "styled-components";

export const Subtitle = ({ subtitle }) => (
  <StyledSubtitle>
    {subtitle ?? (
      <>
        Сплачено до <span>28.07.2023</span>
      </>
    )}
  </StyledSubtitle>
);

const StyledSubtitle = styled.div`
  color: rgba(255, 255, 255, 0.4);
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.22px;

  span {
    color: rgba(255, 255, 255, 0.6);
  }
`;
