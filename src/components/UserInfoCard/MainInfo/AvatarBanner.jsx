import styled from "styled-components";
import addPhoto from "../../../assets/images/add-photo-banner.svg";
import avatarBg from "../../../assets/images/avatar-bg-card.png";

export const AvatarBanner = () => (
  <StyledAvatarBanner
    className="flex items-center justify-center"
    avatarBg={avatarBg}
  >
    <img src={addPhoto} alt="" />
  </StyledAvatarBanner>
);

const StyledAvatarBanner = styled.div`
  height: 40px;
  border-radius: 10px 10px 0px 0px;
  margin-bottom: 6px;
  background: url(${({ avatarBg }) => avatarBg}) center/cover no-repeat;
  margin: -6px -6px 6px;
  img {
    width: 24px;
    height: 24px;
  }
`;
