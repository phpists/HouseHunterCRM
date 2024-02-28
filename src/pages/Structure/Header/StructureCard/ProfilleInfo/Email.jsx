import styled from "styled-components";
import emailIcon from "../../../../../assets/images/email.svg";

export const Email = ({ email }) => (
  <StyledEmail className="notClickable">
    <div className="title flex items-center notClickable">
      <img src={emailIcon} alt="" className="notClickable" />{" "}
      <span>{email}</span>
    </div>
    <div className="label notClickable">Email</div>
  </StyledEmail>
);

const StyledEmail = styled.div`
  padding: 6px 8px;
  border-radius: 6px;
  background: #444;
  .title {
    color: #fff;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 16.52px */
    letter-spacing: 0.28px;
    margin-bottom: 2px;
    span {
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 180px;
    }
    img {
      margin-right: 4px;
    }
  }
  .label {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
`;
