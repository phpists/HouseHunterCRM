import styled from "styled-components";

export const Name = () => (
  <StyledName className="clickable">Юрій Мицавка</StyledName>
);

const StyledName = styled.div`
  margin-bottom: 2px;
  color: #fff;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 100;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
`;
