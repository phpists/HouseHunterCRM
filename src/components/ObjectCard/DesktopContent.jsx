import styled from "styled-components";
import { Slider } from "./Slider/Slider";
import { MainInfo } from "./MainInfo/MainInfo";
import { Info } from "./Info/Info";
import { Tags } from "./Tags/Tags";
import { Contacts } from "./Contacts/Contacts";
import { ShowMore } from "./ShowMore/ShowMore";

export const DesktopContent = () => (
  <StyledDesktopContent className="flex items-center justify-between">
    <Slider />
    <MainInfo />
    <Info className="desktop-item" />
    <Tags />
    <Contacts className="desktop-item" />
    <ShowMore />
    <div className="mobile-footer w-full">
      <Info />
      <Contacts />
    </div>
  </StyledDesktopContent>
);

const StyledDesktopContent = styled.div`
  height: max-content;
  display: grid;
  grid-template-columns: repeat(5, max-content);
  justify-content: space-between;
  .mobile-footer {
    display: none;
    margin-top: 10px;
    grid-template-columns: 1fr 200px;
    gap: 10px;
  }

  @media (max-width: 1399.9px) {
    display: flex;
    flex-wrap: wrap;
    .desktop-item {
      display: none;
    }
    .mobile-footer {
      display: grid;
    }
  }
  @media (max-width: 801px) {
    display: none;
  }
`;
