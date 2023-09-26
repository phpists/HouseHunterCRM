import styled from "styled-components";
import { LastSeen } from "./LastSeen";
import { Photo } from "./Photo";
import img1 from "../../../../../assets/images/object-pic-1.png";
import img2 from "../../../../../assets/images/object-pic-2.png";
import { Title } from "./Title";
import { Tag } from "./Tag";
import { CopyLink } from "./CopyLink";
import { Comments } from "./Comments";
import { ReactComponent as Arrow } from "../../../../../assets/images/welcome-step-arrow.svg";

export const Objects = () => (
  <StyledObjects>
    <LastSeen />
    <div className="flex items-center">
      <Photo photo={img1} />
      <Photo photo={img2} />
      <div>
        <Title />
        <Tag />
      </div>
      <div className="bts flex items-center">
        <CopyLink />
        <Comments />
      </div>
      <Arrow className="arrow-main" />
    </div>
  </StyledObjects>
);

const StyledObjects = styled.div`
  padding: 10px;
  border-radius: 9px;
  background: #363636;
  position: relative;
  cursor: pointer;
  .bts {
    margin-left: 38px;
  }
  .arrow-main {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 25px;
    height: 25px;
    path {
      transition: all 0.3s;
    }
  }
  &:hover {
    .arrow-main {
      path {
        fill-opacity: 1;
      }
    }
  }
`;
