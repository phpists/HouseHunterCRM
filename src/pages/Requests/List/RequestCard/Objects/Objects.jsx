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
      <div className="clickable objects-info-wrapper">
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
  @media (max-width: 1399.9px) {
    width: 100%;
  }

  .objects-info-wrapper {
    width: 100%;
  }
`;
