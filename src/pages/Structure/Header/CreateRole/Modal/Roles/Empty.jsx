import styled from "styled-components";

export const Empty = () => <StyledEmpty>Пусто</StyledEmpty>;

const StyledEmpty = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-family: Overpass;
  font-size: 18px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  letter-spacing: 0.36px;
  margin-bottom: 10px;
  text-align: center;
`;
