import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { Characteristic } from "./Characteristic/Characteristic";
import { Price } from "./Price/Price";

export const MainInfo = () => {
  return (
    <StyledMainInfo>
      <Header className="desktop-maininfo-header" />
      <Characteristic />
      <Price className="desktop-price-wrapper" />
    </StyledMainInfo>
  );
};

const StyledMainInfo = styled.div`
  @media (max-width: 1300px) {
    .desktop-maininfo-header,
    .desktop-price-wrapper {
      display: none;
    }
  }
`;
