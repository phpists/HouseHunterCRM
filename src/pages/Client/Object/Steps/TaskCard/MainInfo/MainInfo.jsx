import { styled } from "styled-components";
import { Photo } from "./Photo";
import { Location } from "./Location";
import { Description } from "./Description";
import { Contact } from "./Contact/Contact";
import { Price } from "../Price";

export const MainInfo = ({ open }) => (
  <StyledMainInfo className="flex items-center justify-between">
    <div className="flex items-center">
      <Photo />
      <div className="flex flex-col justify-end">
        <Location />
        <Description />
      </div>
    </div>
    {open ? <Price /> : <Contact />}
  </StyledMainInfo>
);

const StyledMainInfo = styled.div`
  width: 100%;
`;
