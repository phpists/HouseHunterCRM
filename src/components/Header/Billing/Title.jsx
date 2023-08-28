import { styled } from "styled-components";

export const Title = ({ open }) => (
  <StyledTitle open={open}>28 320₴</StyledTitle>
);

const StyledTitle = styled.div`
  color: #fff;
  font-family: Overpass;
  font-size: ${({ open }) => (open ? 20 : 15)}px;
  font-style: normal;
  font-weight: 500;
  line-height: 118%;
  letter-spacing: ${({ open }) => (open ? 0.4 : 0.3)}px;
  margin-bottom: 2px;
  transition: all 0.3s;
`;
