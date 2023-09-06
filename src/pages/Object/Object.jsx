import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { Photos } from "./Photos/Photos";
import { MainInfo } from "./MainInfo/MainInfo";
import { Info } from "./Info/Info";

export const Object = () => {
  return (
    <StyledObject>
      <Header />
      <div className="object-wrappper">
        <Photos />
        <MainInfo />
        <Info />
      </div>
    </StyledObject>
  );
};

const StyledObject = styled.div`
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  .object-wrappper {
    padding: 0 39px 10px 17px;
    display: grid;
    grid-template-columns: max-content 1fr 1fr;
    gap: 15px;
  }
`;
