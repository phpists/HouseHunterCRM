import { styled } from "styled-components";

export const Title = ({ title, className }) => (
  <StyledTitle className={`${className}`} title={title}>
    <span>{title}</span>
  </StyledTitle>
);

const StyledTitle = styled.div`
  color: var(--main-color);
  font-family: Overpass;
  font-size: 17px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 20.06px */
  letter-spacing: 0.34px;
  margin-right: 10px;
  width: 10svw;
  max-width: 280px;
  span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    display: block;
    line-height: 1.5;
  }
  @media (max-width: 1700px) {
    max-width: 150px;
  }
  @media (max-width: 700px) {
    font-size: 14px;
  }
`;
