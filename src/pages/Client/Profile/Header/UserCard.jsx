import styled from "styled-components";
import { Avatar } from "./Avatar";
import { Email } from "./Email";
import { Name } from "./Name";
import { Tag } from "./Tag";

export const UserCard = () => (
  <StyledUserCard className="flex items-center">
    <Avatar />
    <div className="flex items-start">
      <div className="flex flex-col items-start mr-3">
        <Name />
        <Email />
      </div>
      <Tag />
    </div>
  </StyledUserCard>
);

const StyledUserCard = styled.div`
  .avatar {
    border: none;
    height: 88px;
    width: 88px;
    padding: 15px;
    margin-bottom: 20px;
  }
`;
