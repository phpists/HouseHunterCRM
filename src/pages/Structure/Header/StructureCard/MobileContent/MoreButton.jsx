import styled from "styled-components";

export const MoreButton = ({ title, onClick }) => (
  <StyledMoreButton
    className="flex items-center justify-center notClickable"
    onClick={onClick}
  >
    {title}
  </StyledMoreButton>
);

const StyledMoreButton = styled.div`
  border-radius: 14px;
  background: var(--bg-10);
  color: var(--second-color);
  text-align: center;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  height: 43px;
  &:hover {
    color: var(--color-2);
  }

  @media (min-width: 850px) {
    display: none;
  }
`;
