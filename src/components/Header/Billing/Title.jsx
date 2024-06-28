import { styled } from "styled-components";

export const Title = ({ open, balance, value, onChange }) => (
  <StyledTitle open={open}>
    {open ? (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      `${balance}₴`
    )}
  </StyledTitle>
);

const StyledTitle = styled.div`
  color: var(--main-color);
  font-family: Overpass;
  font-size: ${({ open }) => (open ? 20 : 15)}px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: 118%;
  letter-spacing: ${({ open }) => (open ? 0.4 : 0.3)}px;
  transition: all 0.3s;
  @media (max-width: 1200px) {
    font-size: 15px !important;
  }
  @media (max-width: 500px) {
    font-size: 12px !important;
  }
`;
