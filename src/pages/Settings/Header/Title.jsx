import { styled } from "styled-components";

export const Title = ({ title }) => (
  <StyledTitle>
    <div className="full">{title}</div>
  </StyledTitle>
);

const StyledTitle = styled.div`
  color: var(--dark-90);
  font-weight: 200;
  font-family: Overpass;
  font-size: 18px;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.36px;
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
