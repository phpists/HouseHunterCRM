import styled from "styled-components";
import emptyAvatar from "../../../../../../assets/images/small-avatar.svg";
import { Id } from "../Id";

export const Header = ({ name, role, id, avatar }) => (
  <StyledHeader
    avatar={avatar?.legnth > 0 ? avatar : emptyAvatar}
    className="flex items-start justify-between openLink"
  >
    <div className="flex items-center openLink">
      <div className="avatar openLink" />
      <div className="info openLink">
        <div className="name openLink">{name}</div>
        <div className="role openLink">{role}</div>
      </div>
    </div>
    <Id id={id} />
  </StyledHeader>
);

const StyledHeader = styled.div`
  margin-bottom: 4px;
  .avatar {
    margin-right: 13px;
    height: 30px;
    width: 30px;
    border-radius: 100%;
    background: url(${({ avatar }) => avatar}) center/cover no-repeat;
    flex-shrink: 0;
  }
  .name {
    font-family: Overpass;
    font-size: 14px;
    font-weight: 200;
    line-height: 16.52px;
    letter-spacing: 0.02em;
    text-align: left;
    color: var(--main-color);
    margin-bottom: 2px;
  }
  .role {
    font-family: Overpass;
    font-size: 12px;
    font-weight: 200;
    line-height: 14.16px;
    letter-spacing: 0.02em;
    text-align: left;
    opacity: 0.4;
  }
`;
