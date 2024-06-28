import styled from "styled-components";
import { ReactComponent as Icon } from "../../../../../assets/images/email.svg";

export const Email = ({ email }) => (
  <StyledEmail className="notClickable">
    <div className="title flex items-center notClickable">
      <Icon className="notClickable" /> <span>{email}</span>
    </div>
    <div className="label notClickable">Email</div>
  </StyledEmail>
);

const StyledEmail = styled.div`
  padding: 6px 8px;
  border-radius: 6px;
  background: var(--card-bg-3);
  margin-top: 4px;
  .title {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-200);
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
    svg {
      margin-right: 4px;
    }
  }
  .label {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
`;
