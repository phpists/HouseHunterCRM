import styled from "styled-components";

export const Name = () => <StyledName>Юрій Мицавка</StyledName>;

const StyledName = styled.div`
  color: #fff;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  margin-bottom: 2px;
`;
