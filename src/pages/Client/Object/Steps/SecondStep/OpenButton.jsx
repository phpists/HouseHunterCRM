import { styled } from "styled-components";
import { ReactComponent as Arrow } from "../../../../../assets/images/arrow.svg";
import { CopyLink } from "../../../../../components/CopyLink";

export const OpenButton = () => (
  <StyledOpenButton className="flex items-center">
    <div className="open-link flex items-center justify-between">
      Перейти в підбірку <Arrow />
    </div>
    <CopyLink />
  </StyledOpenButton>
);

const StyledOpenButton = styled.div`
  color: #fff;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  .open-link {
    padding: 7px 6px 5px 10px;
    border-radius: 9px;
    transition: all 0.3s;
    cursor: pointer;
    margin-right: 10px;
    width: 100%;
    svg {
      scale: 0;
      opacity: 0;
      transform: translateX(-10px);
      transition: all 0.3s;
    }
    path {
      fill: #fff;
      opacity: 1;
    }
    &:hover {
      background: rgba(255, 255, 255, 0.05);
      svg {
        scale: 1;
        opacity: 1;
        transform: translateX(0px);
      }
    }
  }
`;
