import { styled } from "styled-components";
import avatarIcon from "../../../assets/images/small-avatar-green.svg";
import { useAppSelect } from "../../../hooks/redux";
import { handleGetRoleAvatar } from "../../../utilits";

export const Avatar = () => {
  const { user } = useAppSelect((state) => state.auth);

  return (
    <StyledAvatar
      avataricon={
        user?.photo?.length > 0
          ? user?.photo
          : handleGetRoleAvatar(user?.struct_level)
      }
      className="clickable"
    />
  );
};

const StyledAvatar = styled.div`
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 10px;
  background: url(${({ avataricon }) => avataricon}) center/cover no-repeat;
`;
