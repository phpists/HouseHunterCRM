import { styled } from "styled-components";
import { Avatar } from "./Avatar";

export const Profile = ({ small, rieltor }) => (
  <StyledProfile small={small} className="flex items-center">
    <Avatar small={small} photo={rieltor?.photo} />
    <div className="profile-info">
      <div className="name">{rieltor?.name ?? "-"}</div>
      <div className="role">Рієлтор</div>
    </div>
  </StyledProfile>
);

const StyledProfile = styled.div`
  color: #fff;
  .profile-info {
    margin-left: ${({ small }) => (small ? 7 : 12)}px;
  }
  .name {
    font-size: ${({ small }) => (small ? 16 : 18)}px;
    line-height: 118%;
    letter-spacing: 0.36px;
  }
  .role {
    font-size: ${({ small }) => (small ? 12 : 14)}px;
    font-weight: 400;
    line-height: 118%;
    letter-spacing: 0.28px;
    opacity: 0.5;
  }
`;
