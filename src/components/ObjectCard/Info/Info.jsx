import styled from "styled-components";
import { Header } from "./Header/Header";
import { Text } from "./Text";
import { Footer } from "./Footer/Footer";

export const Info = ({ className }) => {
  return (
    <StyledInfo
      className={`flex flex-col justify-between hide clickable ${className}`}
    >
      <Header />
      <Text />
      <Footer />
    </StyledInfo>
  );
};

const StyledInfo = styled.div`
  margin-right: 10px;
  height: 200px;
  overflow: auto;
  @media (min-width: 1400px) {
    width: 240px;
  }
  @media (min-width: 1500px) {
    width: 300px;
  }
  @media (min-width: 1550px) {
    width: 350px;
  }
  @media (min-width: 1600px) {
    width: auto;
  }
`;
