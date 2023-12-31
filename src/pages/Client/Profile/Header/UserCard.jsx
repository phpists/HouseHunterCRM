import styled from "styled-components";
import { Avatar } from "./Avatar";
import { Email } from "./Email";
import { Name } from "./Name";
import { Tag } from "./Tag";

export const UserCard = ({ photo, name, email }) => (
  <StyledUserCard className="flex items-center">
    <Avatar photo={photo} />
    <div className="flex items-start">
      <div className="flex flex-col items-start mr-3">
        <Name name={name} />
        <Email email={email} />
      </div>
      {/* <Tag /> */}
    </div>
  </StyledUserCard>
);

const StyledUserCard = styled.div`
  text-align: left;
  .avatar {
    border: none;
    height: 88px;
    width: 88px;
    padding: 15px;
    margin-bottom: 20px;
  }
`;
