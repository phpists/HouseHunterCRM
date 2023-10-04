import { styled } from "styled-components";

export const Title = ({ title }) => (
  <StyledTitle>
    <div className="full">{title} </div>
    <span className="mobile">Обрано 0</span>
  </StyledTitle>
);

const StyledTitle = styled.div`
  color: #fff;
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 23.6px */
  letter-spacing: 0.4px;
  .mobile {
    display: none;
  }
  @media (max-width: 850px) {
    font-size: 18px;
    .mobile {
      display: block;
    }
    .full {
      display: none;
    }
  }
`;
