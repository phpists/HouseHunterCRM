import styled from "styled-components";
import { SeenTime } from "./SeenTime";
import { Photos } from "./Photos/Photos";
import { Title } from "./Title";
import { Tag } from "./Tag";
import { OpenButton } from "./OpenButton";
import { Buttons } from "./Buttons";

export const Objects = () => (
  <StyledObjects className="clickable">
    <SeenTime />
    <div className="flex items-center clickable">
      <Photos />
      <div className="clickable">
        <div className="flex items-center justify-between clickable">
          <div className="clickable">
            <Title />
            <Tag />
          </div>
          <Buttons />
        </div>
        <OpenButton />
      </div>
    </div>
  </StyledObjects>
);

const StyledObjects = styled.div`
  padding: 10px;
  border-radius: 9px;
  background: #363636;
`;
