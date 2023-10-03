import { styled } from "styled-components";

export const Price = () => (
  <StyledPrice className="flex items-center">
    23 500<span>₴</span>
  </StyledPrice>
);

const StyledPrice = styled.div`
  padding: 1px 6px 2px;
  border-radius: 5px;
  background: rgba(103, 203, 78, 0.15);
  color: #50f835;
  font-family: "Open Sans";
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.22px;
  span {
    font-weight: 400;
  }
  @media (max-width: 700px) {
    height: 15px;
  }
`;
