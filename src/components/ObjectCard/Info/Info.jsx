import styled from "styled-components";
import { Header } from "./Header/Header";
import { Text } from "./Text";
import { Footer } from "./Footer/Footer";

export const Info = () => {
  return (
    <StyledInfo className="flex flex-col justify-between hide clickable ">
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
`;
