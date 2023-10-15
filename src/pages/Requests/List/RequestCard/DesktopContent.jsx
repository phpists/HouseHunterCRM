import styled from "styled-components";
import { Client } from "./Client/Client";
import { Date } from "./Date/Date";
import { Info } from "./Info/Info";
import { Comment } from "./Comment";
import { Objects } from "./Objects/Objects";
import { Actions } from "./Actions/Actions";

export const DesktopContent = () => (
  <StyledDesktopContent>
    <Client />
    <Date />
    <Info />
    <Comment />
    <Objects />
    <Actions />
  </StyledDesktopContent>
);

const StyledDesktopContent = styled.div`
  display: none;
  grid-template-columns: repeat(6, max-content);
  gap: 14px;
  justify-content: inherit;
  @media (min-width: 1400px) {
    display: grid;
  }
`;
