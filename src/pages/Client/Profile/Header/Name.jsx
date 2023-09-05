import { styled } from "styled-components";

export const Name = () => <StyledName>Юрій Олексійович</StyledName>;

const StyledName = styled.div`
  color: #fff;
  text-align: right;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
`;
