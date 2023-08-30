import { styled } from "styled-components";

export const Selected = ({ selected, price }) => (
  <StyledSelected className="flex items-center">
    <span>•</span> {selected} обрано ({selected * price}₴)
  </StyledSelected>
);

const StyledSelected = styled.div`
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%;
  letter-spacing: 0.4px;
  color: rgba(255, 255, 255, 0.4);
  margin-left: 5px;
  span {
    color: rgba(255, 255, 255, 0.2);
    margin-right: 5px;
  }
`;
