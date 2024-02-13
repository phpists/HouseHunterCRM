import styled from "styled-components";

export const MlsButton = ({ value, onChange }) => (
  <StyledMlsButton className={`${value && "active"}`} onClick={onChange}>
    MLS
  </StyledMlsButton>
);

const StyledMlsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 6px;
  height: 46px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 0; /* 16.52px */
  letter-spacing: 0.28px;
  text-transform: uppercase;
  transition: all 0.3s;
  flex-shrink: 0;
  white-space: nowrap;
  margin-left: 5px;
  &:hover {
    color: #fff;
    background: #3d8ecc;
    opacity: 0.5;
  }

  &.active {
    color: #fff;
    background: #3d8ecc;
    opacity: 1 !important;
  }

  @media (max-width: 800px) {
    font-size: 11px;
  }
`;
