import { styled } from "styled-components";

export const Title = ({ title, className }) => (
  <StyledTitle className={`${className}`}>
    <span>{title}</span>
  </StyledTitle>
);

const StyledTitle = styled.div`
  color: #fff;
  font-family: Overpass;
  font-size: 17px;
  font-style: normal;
  font-weight: 200;
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
  @media (max-width: 1400px) {
    max-width: 150px;
  }
`;
