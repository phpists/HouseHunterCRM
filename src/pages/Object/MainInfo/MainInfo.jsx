import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { Characteristic } from "./Characteristic/Characteristic";
import { Price } from "./Price/Price";

export const MainInfo = () => {
  return (
    <StyledMainInfo>
      <Header />
      <Characteristic />
      <Price />
    </StyledMainInfo>
  );
};

const StyledMainInfo = styled.div``;
