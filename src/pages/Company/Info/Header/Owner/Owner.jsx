import { styled } from "styled-components";
import { Status } from "../../../../../components/Status";
import { Avatar } from "./Avatar";

export const Owner = () => (
  <StyledOwner className="flex items-center">
    <Status status={1} />
    <div className="name">Юрій О.</div>
    <Avatar />
  </StyledOwner>
);

const StyledOwner = styled.div`
  padding: 3px 3px 3px 6px;
  border-radius: 17px;
  background: #323232;
  .name {
    margin: 0 7px 0 9px;
    color: #fff;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 118%; /* 16.52px */
    letter-spacing: 0.28px;
  }
`;
