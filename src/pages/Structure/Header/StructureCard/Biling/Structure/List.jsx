import { styled } from "styled-components";
import { Avatar } from "./Avatar";
import empty from "../../../../../../assets/images/small-avatar-green.svg";
import { handleGetRoleAvatar } from "../../../../../../utilits";

export const List = ({ photos, level }) => (
  <StyledList className="flex items-center">
    {photos.map((photo, i) => (
      <Avatar
        key={i}
        photo={photo?.length > 0 ? photo : handleGetRoleAvatar(level)}
        zIndex={photos.length - i}
      />
    ))}
  </StyledList>
);

const StyledList = styled.div`
  border-radius: 20px;
  background: #333;
  padding: 4px;
  width: 98px;
  div:not(:first-child) {
    margin-left: -10px;
  }
  @media (max-width: 850px) {
    width: 100%;
  }
`;
