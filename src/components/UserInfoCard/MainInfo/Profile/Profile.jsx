import styled from "styled-components";
import { LastDate } from "./LastDate";
import { Avatar } from "./Avatar";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";
import { RoleSelect } from "./RoleSelect/RoleSelect";

export const Profile = () => (
  <StyledProfile>
    <LastDate />
    <div className="flex items-center">
      <Avatar />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <Title />
          <RoleSelect />
        </div>
        <Subtitle />
      </div>
    </div>
  </StyledProfile>
);

const StyledProfile = styled.div`
  padding: 6px 10px;
`;
