import styled from "styled-components";

export const MoreButton = ({ count }) => (
  <StyledMoreButton className="flex items-center justify-center">
    {count}+
  </StyledMoreButton>
);

const StyledMoreButton = styled.div`
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 34px;
  border: 1.4px solid #323232;
  z-index: 10;
  font-family: Overpass;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.04em;
  text-align: left;
  background: #939393;
  color: rgba(44, 44, 44, 0.4);
  line-height: 0;
`;
