import { styled } from "styled-components";
import { ReactComponent as LocationIcon } from "../../../../../../assets/images/location.svg";

export const Location = () => (
  <StyledLocation>
    <span>Галицький, Шевченківський</span>
    <div className="relative flex items-center justify-between">
      <span>Галицький, Шевченківський</span>
      <LocationIcon />
    </div>
  </StyledLocation>
);

const StyledLocation = styled.div`
  color: var(--main-color);
  text-overflow: ellipsis;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  padding: 3px 3px 3px 0px;
  border-radius: 6px;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
  span {
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100px;
    transition: all 0.3s;
  }
  div {
    position: absolute;
    background: var(--card-bg-2);
    backdrop-filter: blur(8.5px);
    top: 0;
    left: 0;
    padding: 3px 3px 3px 7px;
    border-radius: 6px;
    transition: all 0.3s;
    opacity: 0;
    width: 0;
    z-index: 1;
    path {
      fill: #5d63ff;
    }
    g {
      opacity: 1;
    }
    span {
      width: max-content;
      opacity: 1 !important;
    }
  }
  &:hover {
    span {
      opacity: 0;
    }
    div {
      width: 274px;
      opacity: 1;
    }
  }
`;
