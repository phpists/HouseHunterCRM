import styled from "styled-components";
import { LastSeen } from "./LastSeen";
import { Photo } from "./Photo";
import img1 from "../../../../../assets/images/object-pic-1.png";
import img2 from "../../../../../assets/images/object-pic-2.png";
import { Title } from "./Title";
import { Tag } from "./Tag";
import { Comments } from "./Comments";
import { ReactComponent as Arrow } from "../../../../../assets/images/welcome-step-arrow.svg";
import { CopyLink } from "../../../../../components/CopyLink";

export const Objects = ({ data, id, onOpenChat }) => (
  <StyledObjects>
    <LastSeen />
    <div className="flex items-center">
      <Photo photo={img1} />
      <Photo photo={img2} />
      <div>
        <Title count={data?.count_objects} />
        <Tag count={data?.count_new_object} />
      </div>
      <div className="bts flex items-center">
        <CopyLink
          className="copy-btn"
          link={`https://xhouse-web.netlify.app/?id=${id}`}
        />
        <Comments onOpenChat={onOpenChat} />
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
  .copy-btn {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.18);
    transition: all 0.3s;
    margin-right: 4px;
    padding: 4px;
  }
  @media (max-width: 1100px) {
    .arrow-main {
      display: none;
    }
  }
  @media (max-width: 900px) {
    .bts {
      margin-left: 8px;
    }
  }
`;
