import styled from "styled-components";
import { Photo } from "./Photo";
import photo from "../../../../../assets/images/object.png";
import { Info } from "./Info/Info";

export const Object = () => (
  <StyledObject>
    <Photo photo={photo} />
    <Info />
  </StyledObject>
);

const StyledObject = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
