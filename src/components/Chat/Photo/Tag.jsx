import { styled } from "styled-components";

export const Tag = () => <StyledTag>Об'єкт</StyledTag>;

const StyledTag = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  color: #fff;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  padding: 3px 6px 1px;
  border-radius: 50px;
  background: #5d63ff;
  backdrop-filter: blur(2px);
`;
