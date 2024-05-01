import { styled } from "styled-components";
import { ReactComponent as InfoIcon } from "../../../../assets/images/info.svg";
import { Button } from "./Button";

export const Info = () => (
  <StyledInfo className="mr-2.5">
    <div className="text flex items-center">
      <div>
        Також можлива оплата <br /> готівкою у нас в офісі
      </div>
      <InfoIcon />
    </div>
    <Button Icon={InfoIcon} hoverColor="#5D63FF" />
  </StyledInfo>
);

const StyledInfo = styled.div`
  position: relative;
  .text {
    position: absolute;
    top: -6px;
    right: -5px;
    width: max-content;
    padding: 6px 10px 4px 8px;
    border-radius: 7px;
    background: var(--active-bg);
    color: #5d63ff;
    font-family: Overpass;
    font-size: 12px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 118%; /* 14.16px */
    letter-spacing: 0.24px;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s;
    div {
      margin-right: 25px;
    }
    svg,
    g,
    path {
      opacity: 1;
      fill-opacity: 1;
    }
    path {
      opacity: 1;
      fill: #5d63ff;
    }
  }
  &:hover {
    & > .text {
      visibility: visible;
      opacity: 1;
    }
  }
`;
